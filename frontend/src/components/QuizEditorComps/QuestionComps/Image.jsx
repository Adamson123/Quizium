import { memo, useMemo, useRef } from "react";
import bufferToObjUrl from "../../../utils/bufferToObjUrl";
import Loading from "../../ui/Loading";
import { convertToWebp } from "../../../utils/convertToWebp";
const Image = memo(({ imageProps }) => {
    const {
        singleQuestion,
        handleDeleteQuestion,
        imagePicked,
        setPickedImage,
    } = imageProps;
    const uploadRef = useRef();

    console.log("Image rendered");

    //for updating  image

    const updateImage = async (event) => {
        const image = event.target.files[0];

        if (image) {
            let optimizedImage = image;
            if (optimizedImage.name.split(".")[1] !== "webp") {
                //convert to webp for performance
                optimizedImage = await convertToWebp(
                    URL.createObjectURL(image),
                    image.name
                );
            }
            setPickedImage(optimizedImage);
        }

        event.target.value = "";
    };
    return (
        <div>
            {/* Change Image */}
            {singleQuestion.image && (
                <div
                    className="bg-red-600 w-full px-1 pt-1 pb-2
                    rounded insetShadow
                    flex justify-between"
                >
                    <button
                        onClick={() => handleDeleteQuestion("")}
                        className="bg-[rgba(0,0,0,0.4)] p-1 px-2 rounded"
                    >
                        <span className="bi-trash-fill text-[17px]"></span>
                    </button>

                    <button
                        onClick={() => {
                            uploadRef.current.click();
                        }}
                        className="bg-[rgba(0,0,0,0.4)] text-[13px] p-1 px-2 rounded
     isidoraBold"
                    >
                        Change Image
                    </button>
                </div>
            )}
            <input
                onChange={updateImage}
                ref={uploadRef}
                type="file"
                className="absolute w-0 h-0 pointer-events-none opacity-0"
                accept=".png, .jpg, .jpeg, .webp"
            />
            <div
                className={`w-full h-[300px] border-2 border-grayOne rounded 
            relative m-auto`}
            >
                {imagePicked && (
                    <Loading
                        cus={`loading-lg absolute top-[50%] left-[50%] translate-y-[-50%]
          translate-x-[-50%] bg-shinyPurple`}
                    />
                )}
                {!singleQuestion.image && (
                    <div
                        className="absolute top-[50%] translate-y-[-50%] flex 
           flex-col justify-center items-center
           gap-2 w-full fill text-grayTwo"
                    >
                        <span className="text-center text-[15px] font-bold">
                            File supported - .png, .jpg, .jpeg, .webp
                        </span>
                        {!imagePicked && (
                            <button
                                onClick={() => {
                                    uploadRef.current.click();
                                }}
                                className=" flex justify-center items-center p-3 h-[40px]
                     bg-transparent 
          w-16 rounded  border-2 border-grayTwo"
                            >
                                <span className="bi-upload font-bold"></span>
                            </button>
                        )}
                    </div>
                )}

                {/* image */}
                {(singleQuestion.image || imagePicked) && (
                    <img
                        src={
                            imagePicked
                                ? URL.createObjectURL(imagePicked)
                                : bufferToObjUrl(
                                      singleQuestion.image.image.data.data
                                  )
                        }
                        className="h-full w-full object-contain"
                        alt="question based on quiz question"
                    />
                )}
            </div>
        </div>
    );
});

export default Image;
