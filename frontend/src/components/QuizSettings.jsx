import { memo, useState } from "react";

import { createQuiz, updateQuiz } from "../api/QuizApi";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import { convertToWebp } from "../utils/convertToWebp";
import SubSettingsFirst from "./QuizSettingsComps/SubSettingsFirst";
import SubSettingsSec from "./QuizSettingsComps/SubSettingsSec";

const QuizSettings = memo((props) => {
  const { mutateAsync: createQuizFunc } = useMutation(createQuiz);
  const { mutateAsync: updateQuizFunc } = useMutation(updateQuiz);
  const [quizSettings, setQuizSettings] = useState(
    !props.config
      ? {
          title: "",
          description: "",
          timeLimit: 1,
          applyTime: "entire",
          visibility: "public",
          category: "General Knowledge",
        }
      : {
          ...props.config,
          timeLimit:
            props.config.applyTime === "entire"
              ? props.config.timeLimit / 60
              : props.config.timeLimit,
        },
  );

  console.log("quiz settings rendered");

  const [pickedImage, setPickedImage] = useState("");
  const [convertingImage, setConvertingImage] = useState(false);
  const navigate = useNavigate();

  const handleQuizSettings = (event) => {
    console.log(event.target.value);
    setQuizSettings(
      (q) => (q = { ...q, [event.target.name]: event.target.value }),
    );
  };

  const handlePickedImage = async (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      let optimizedImage = selectedImage;
      if (optimizedImage.name.split(".")[1] !== "webp") {
        //convert to webp for performance
        setConvertingImage(true);
        optimizedImage = await convertToWebp(
          URL.createObjectURL(selectedImage),
          selectedImage.name,
        );
        setConvertingImage(false);
      }
      setPickedImage(optimizedImage);
    }
  };

  const toSeconds = () => {
    const to = quizSettings.applyTime === "entire" ? 60 : 1;
    return quizSettings.timeLimit * to;
  };

  const submitSetting = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append(
      "settings",
      JSON.stringify({
        ...quizSettings,
        timeLimit: toSeconds(),
        coverImg: "",
      }),
    );
    formData.append("file", pickedImage);

    const promise = !props.config
      ? createQuizFunc(formData)
      : updateQuizFunc({ formData, id: props.id });

    toast.promise(promise, {
      loading: !props.config
        ? "Creating quiz settings"
        : "Updating quiz settings",
      success: (data) => {
        return data.msg;
      },
      error: (data) => {
        return data.err;
      },
    });
    const res = await promise;

    if (res.msg) {
      if (!props.config) {
        navigate("/quiz-editor/" + res.quizId);
      } else {
        props.refetch();
      }
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 bottom-0 left-0
         bg-transparentBlack z-[500] p-3 scaleUp popBlock ${
           props.show ? "scale-1" : "scale-0"
         }`}
    >
      <form
        onSubmit={submitSetting}
        className="scrollbar w-full max-w-[700px] bg-mainBg p-5 
                    px-6 pb-10 m-auto rounded overflow-y-auto 
                    overflow-x-hidden h-full shadow"
      >
        <h2 className="text-[20px] font-bold isidoraBold">Quiz Settings</h2>
        <div
          className="mt-5 flex flex-col smd:flex-row
                 smd:items-start gap-4 smd:gap-8 smd:justify-between"
        >
          {/* Title , description , time limit and visibity container */}
          <SubSettingsFirst
            quizSettings={quizSettings}
            handleQuizSettings={handleQuizSettings}
          />
          {/* Cover-image and select subject container*/}
          <SubSettingsSec
            pickedImage={pickedImage}
            convertingImage={convertingImage}
            handlePickedImage={handlePickedImage}
            quizSettings={quizSettings}
            handleQuizSettings={handleQuizSettings}
          />
        </div>
        <div className="flex justify-center mt-7 gap-3 isidoraBold">
          <button
            type="button"
            onClick={() => {
              if (props.config) {
                setQuizSettings((q) => (q = props.config));
              } else {
                setQuizSettings(
                  (q) =>
                    (q = {
                      title: "",
                      description: "",
                      timeLimit: 1,
                      applyTime: "entire",
                      visibility: "public",
                      category: "General Knowledge",
                    }),
                );
              }
              setPickedImage("");
              setConvertingImage(false);
              props.setShow(false);
            }}
            className="w-24 h-10 insetShadow rounded
            bg-grayTwo text-[13px] clickable"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-24 h-10 insetShadow rounded
              bg-shinyPurple text-[13px] clickable"
          >
            {!props.config ? "Create Quiz" : "Update Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
});

export default QuizSettings;
