import { useContext, useRef, useState } from "react";
import SettingInputComp from "../components/SettingInputComp";
import { updatePasswordFunc, updatePersonalInfoFunc } from "../api/UserApi";
import { toast } from "react-hot-toast";
import { useMutation } from "react-query";
import { dataContext } from "../layouts/layout";

const SettingsPage = () => {
    const uploadBtnRef = useRef();
    //user info coming from layout component
    const { refetch, profileImage, setProfileImage, email, name, isLoading } =
        useContext(dataContext);

    //function for updating personal info (profile image and username)
    const { mutateAsync: updatePersonalData } = useMutation(
        updatePersonalInfoFunc
    );

    //function for updating user password
    const { mutateAsync: updatePassword } = useMutation(updatePasswordFunc);

    //declaring profile image value globally
    const [profileImage_2, setProfileImage_2] = useState(profileImage);

    //image picked from the user
    const [imagePicked, setImagePicked] = useState("");

    //value for email and name when inputing
    const [personalInput, setPersonalInput] = useState({ name });
    //value for password new-passsword and confirm-password
    const [passwordInput, setPasswordInput] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    //function for setting image picked by the user
    const chooseImage = (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            setImagePicked((i) => (i = selectedImage));
            //just to display the image the user is about pick
            setProfileImage_2((p) => (p = URL.createObjectURL(selectedImage)));
        }
    };

    //submit image and name update
    const handlePersonalInfoSubmit = async (event) => {
        event.preventDefault();
        if (name !== personalInput.name || imagePicked) {
            const formdata = new FormData();
            formdata.append("file", imagePicked);
            formdata.append("name", personalInput.name);

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
            refetch();

            setImagePicked((i) => (i = ""));
            //update profile image to make it reflect in other components it's used
            setProfileImage((p) => (p = profileImage_2));
        }
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();

        const promise = updatePassword(passwordInput);
        toast.promise(promise, {
            loading: "Updating password...",
            success: (data) => {
                return data.msg;
            },
            error: (data) => {
                return data.err;
            },
        });
        const passwordUpdRes = await promise;
    };

    return (
        <div
            className="pt-16 bg-mainBg min-h-screen flex 
    flex-col items-center md:pl-[180px]"
        >
            <div
                className="flex flex-col items-center 
        w-full max-w-[500px] p-4  text-textColor "
            >
                <h2
                    className="text-3xl text-center 
        font-bold text-textColor isidora mb-7"
                >
                    Settings
                </h2>
                {/* Personal info content*/}
                <div className=" isidoraReg w-full">
                    <h2 className="isidoraSemiBold">Personal Info</h2>
                    {/* Personal info form*/}

                    <form
                        onSubmit={handlePersonalInfoSubmit}
                        className="mt-3 text-[13px]"
                    >
                        <div className="border-[2px] border-grayTwo rounded">
                            <div className="flex flex-col  p-3 pb-5 border-b-[2px]  border-grayTwo ">
                                <div className="profileImg w-[100px] h-[100px] relative mb-5">
                                    {isLoading ? (
                                        <div className="skeleton w-full h-full rounded-full"></div>
                                    ) : (
                                        <img
                                            src={profileImage_2}
                                            alt="your profile image"
                                            className="w-full h-full rounded-full border object-cover"
                                        />
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
                  bg-shinyPurple insetShadow absolute bottom-[-2px] right-[-2px]
                flex items-center
                   justify-center cursor-pointer text-[15px] bi-camera clickable"
                                    ></button>
                                </div>

                                {/* Username input */}

                                <SettingInputComp
                                    input={personalInput.name}
                                    setInput={setPersonalInput}
                                    type="text"
                                    name="name"
                                    maxLength={17}
                                    minLength={2}
                                />
                            </div>
                            <div className="flex flex-col p-3 pb-5">
                                {/* Email input */}

                                <SettingInputComp
                                    input={email}
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
                  imagePicked || personalInput.name !== name
                      ? "bg-shinyPurple clickable"
                      : "bg-gray-400"
              }  font-bold insetShadow isidoraBold`}
                        >
                            Save changes
                        </button>
                    </form>

                    {/* Password info */}
                </div>
                {/* Password content*/}
                <div className=" isidoraReg w-full mt-7">
                    <h2 className="isidoraSemiBold">Password</h2>
                    {/* Password info form*/}

                    <form
                        onSubmit={handlePasswordSubmit}
                        className="mt-3 text-[13px]"
                    >
                        <div className="border-[2px] border-grayTwo rounded">
                            <div className="flex flex-col  p-3 pb-5 border-grayTwo ">
                                {/* Current Password input */}

                                <SettingInputComp
                                    input={passwordInput.currentPassword}
                                    setInput={setPasswordInput}
                                    type="password"
                                    name="current Password"
                                />
                            </div>
                            <div className="flex flex-col p-3 pb-5">
                                {/* New Password input */}

                                <SettingInputComp
                                    input={passwordInput.newPassword}
                                    setInput={setPasswordInput}
                                    type="password"
                                    name="new Password"
                                />
                            </div>
                            <div className="flex flex-col p-3 pb-5">
                                {/* Confirm New Password input */}

                                <SettingInputComp
                                    input={passwordInput.confirmPassword}
                                    setInput={setPasswordInput}
                                    type="password"
                                    name="confirm Password"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="clickable w-full rounded-[3px] mt-3 p-3
             bg-shinyPurple font-bold insetShadow isidoraBold "
                        >
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
