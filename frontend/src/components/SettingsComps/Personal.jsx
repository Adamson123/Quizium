import React, { useContext, useRef, useState } from "react";
import { useMutation } from "react-query";
import { updatePersonalInfoFunc } from "../../api/UserApi";
import toast from "react-hot-toast";
import Loading from "../ui/Loading";
import SettingInputComp from "./SettingInputComp";
import { dataContext } from "../../layouts/cayout";

const Personal = () => {
    const value = useContext(dataContext);
    const uploadBtnRef = useRef();
    //function for updating personal info (profile image and username)
    const { mutateAsync: updatePersonalData } = useMutation(
        updatePersonalInfoFunc
    );

    //value for email and name when inputing
    const [personalInput, setPersonalInput] = useState({ name: value?.name });

    //image picked from the user
    const [imagePicked, setImagePicked] = useState("");
    const [convertingImage, setConvertingImage] = useState(false);

    //function for setting image picked by the user
    const chooseImage = async (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            let optimizedImage = selectedImage;
            if (optimizedImage.name.split(".")[1] !== "webp") {
                //convert to webp for performance
                setConvertingImage(true);
                optimizedImage = await convertToWebp(
                    URL.createObjectURL(selectedImage),
                    selectedImage.name
                );
                setConvertingImage(false);
            }

            setImagePicked(optimizedImage);
        }
    };

    //submit image and name update
    const handlePersonalInfoSubmit = async (event) => {
        event.preventDefault();
        if (value?.name !== personalInput?.name || imagePicked) {
            const formdata = new FormData();
            formdata.append("file", imagePicked);
            formdata.append("name", personalInput?.name);

            const promise = updatePersonalData(formdata);

            toast.promise(promise, {
                loading: "Updating info...",
                success: (data) => {
                    return data.msg;
                },
                error: (data) => {
                    return data.err;
                },
            });

            const personalDataUpdRes = await promise;
            await value?.refetch();

            if (personalDataUpdRes.msg) {
                value?.setProfileImage(URL.createObjectURL(imagePicked));
                setImagePicked("");
            }
            //update profile image to make it reflect in other components it's used
        }
    };

    //was grayTwo
    return (
        <div className=" isidoraReg w-full">
            <h2 className="isidoraSemiBold">Personal Info</h2>
            {/* Personal info form*/}

            <form
                onSubmit={handlePersonalInfoSubmit}
                className="mt-3 text-[13px]"
            >
                <div className="border-[2px] border-mainBg rounded h-[332px]">
                    <div
                        className="flex flex-col  p-3 pb-5 border-b-[2px] 
                       border-mainBg"
                    >
                        <div className="profileImg w-[100px] h-[100px] relative mb-5">
                            {value?.isLoading ? (
                                <div className="skeleton w-full h-full rounded-full"></div>
                            ) : (
                                <div className="w-full h-full relative">
                                    {convertingImage && (
                                        <Loading
                                            cus={`absolute top-[50%] left-[50%] 
                                                translate-x-[-50%] translate-y-[-50%] 
                                                bg-shinyPurple`}
                                        />
                                    )}
                                    <img
                                        src={
                                            imagePicked
                                                ? URL.createObjectURL(
                                                      imagePicked
                                                  )
                                                : value?.profileImage
                                        }
                                        alt="your profile image"
                                        className="w-full h-full rounded-full
                                        border object-cover"
                                    />
                                </div>
                            )}
                            <input
                                ref={uploadBtnRef}
                                type="file"
                                onChange={chooseImage}
                                // className="bg-transparent cursor-pointer absolute bottom-0 right-0 w-6 rounded-full"
                                className="w-0 h-0 pointer-events-none"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    uploadBtnRef.current.click();
                                }}
                                className="h-[33px] w-[33px] rounded-full 
                                bg-shinyPurple insetShadow absolute bottom-[-2px] 
                                right-[-2px]
                                flex items-center
                                justify-center cursor-pointer text-[15px] bi-camera-fill 
                                clickable"
                            ></button>
                        </div>

                        {/* Username input */}

                        <SettingInputComp
                            input={personalInput?.name}
                            setInput={setPersonalInput}
                            type="text"
                            name="name"
                            maxLength={35}
                            minLength={2}
                        />
                    </div>
                    <div className="flex flex-col p-3 pb-5">
                        {/* Email input */}

                        <SettingInputComp
                            input={value?.email}
                            type="email"
                            name="email"
                            disabled
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className={`w-full rounded-[3px] mt-3 
                    p-3 ${
                        imagePicked ||
                        personalInput?.name.trim(" ") !== value?.name
                            ? "bg-shinyPurple clickable"
                            : "bg-grayTwo"
                    }  font-bold insetShadow isidoraBold`}
                >
                    Save changes
                </button>
                {
                    //online show up if an image is picked or name is changed
                    (imagePicked ||
                        personalInput?.name.trim(" ") !== value?.name) && (
                        <button
                            onClick={() => {
                                setImagePicked("");
                                setPersonalInput({ name: value?.name });
                            }}
                            type="button"
                            className={`w-full rounded-[3px] mt-3 font-bold insetShadow
            isidoraBold bg-grayTwo clickable p-3`}
                        >
                            Cancel
                        </button>
                    )
                }
            </form>

            {/* Password info */}
        </div>
    );
};

export default Personal;
