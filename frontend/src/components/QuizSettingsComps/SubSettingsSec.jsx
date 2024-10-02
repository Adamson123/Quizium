import React, { useRef } from "react";
import bufferToObjUrl from "../../utils/bufferToObjUrl";
import Loading from "../ui/Loading";
import quiziumImg from "../../assets/images/defaultCover/quizium-8.webp";
const SubSettingsSec = ({
  pickedImage,
  convertingImage,
  handlePickedImage,
  quizSettings,
  handleQuizSettings,
}) => {
  const uploadBtnRef = useRef();
  const fallbackToDefaultCover = () => {
    return quizSettings.coverImg
      ? bufferToObjUrl(quizSettings.coverImg.image.data.data)
      : quiziumImg;
  };
  return (
    <div className="flex flex-col gap-12  flex-1">
      <div className="h-[260px] flex flex-col gap-3">
        <span className="text-[14px] font-bold">
          Cover image{" "}
          <span className="text-grayTwo text-[12px]">
            (File supported - .png, .jpg, .jpeg, .webp)
          </span>
        </span>
        {/* Cover-image*/}

        <div className="min-w-full rounded relative min-h-[250px]">
          {convertingImage && (
            <Loading
              cus={`loading-lg absolute top-[50%] left-[50%] 
                                translate-x-[-50%] translate-y-[-50%] bg-shinyPurple`}
            />
          )}
          <img
            src={
              pickedImage
                ? URL.createObjectURL(pickedImage)
                : fallbackToDefaultCover()
            }
            className="w-full h-full object-cover
                        rounded shadow-md"
            alt="quiz cover image display"
          />
          <input
            onChange={handlePickedImage}
            type="file"
            accept=".png, .jpg, .jpeg, .webp"
            className="w-0 h-0 pointer-events-none"
            ref={uploadBtnRef}
          />
          <button
            type="button"
            onClick={() => {
              uploadBtnRef.current.click();
            }}
            className="absolute bg-shinyPurple text-[12px] p-2
                     rounded top-2 right-2 insetShadow isidoraBold w-28 
                    clickable shadow-md"
          >
            Choose Image
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className=" flex flex-col">
        <span className="mb-2 text-[14px] font-bold">Category</span>
        <select
          value={quizSettings.category}
          onChange={handleQuizSettings}
          name="category"
          className="py-2 px-3 bg-transparent
            border-grayTwo border rounded focus:border-shinyPurple
             outline-none text-[13px]"
        >
          {[
            "General Knowledge",
            "Entertainment",
            "Science & Technology",
            "Sports",
            "Pop Culture",
            "Academic",
            "Lifestyle",
            "Miscellaneous",
          ].map((o, k) => {
            return (
              <option key={k} value={o} className="bg-mainBg">
                {o}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default SubSettingsSec;
