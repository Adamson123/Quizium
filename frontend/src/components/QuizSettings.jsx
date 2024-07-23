import { memo, useEffect, useRef, useState } from "react";
import quiziumImg from "../assets/images/defaultCover/quizium-8.webp";
import { createQuiz, updateQuizSettings } from "../api/QuizApi";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import BufferToObjUrl from "../utils/BufferToObjUrl";
import Loading from "./ui/Loading";
import { convertToWebp } from "../utils/convertToWebp";

const QuizSettings = memo((props) => {
    const { mutateAsync: createQuizFunc } = useMutation(createQuiz);
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
            : props.config
    );

    console.log("quiz settings rendered");

    const timeLimitRef = useRef();
    const uploadBtnRef = useRef();
    const [pickedImage, setPickedImage] = useState("");
    const [convertingImage, setConvertingImage] = useState(false);
    const navigate = useNavigate();

    const handleQuizSettings = (event) => {
        console.log(event.target.value);
        setQuizSettings(
            (q) => (q = { ...q, [event.target.name]: event.target.value })
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
                    selectedImage.name
                );
                setConvertingImage(false);
            }

            setPickedImage(optimizedImage);
        }
    };

    const scrollToTimeLimit = () => {
        timeLimitRef.current.scrollIntoView({
            block: "center",
            behaviour: "smooth",
        });
    };

    const toSeconds = () => {
        const to = quizSettings.applyTime === "entire" ? 60 : 1;
        return quizSettings.timeLimit * to;
    };

    const submitSetting = async (event) => {
        event.preventDefault();

        const min = quizSettings.applyTime === "entire" ? 1 : 5;

        const max = quizSettings.applyTime === "entire" ? 120 : 250;

        if (quizSettings.timeLimit < min) {
            scrollToTimeLimit();
            return alert("num should not be less than " + min);
        }

        if (quizSettings.timeLimit > max) {
            scrollToTimeLimit();
            return alert("num should not be greater than " + max);
        }

        const formData = new FormData();
        formData.append("settings", JSON.stringify(quizSettings));
        formData.append("file", pickedImage);

        //  if (!props.config) {
        console.log("sending", quizSettings);
        const promise = !props.config
            ? createQuizFunc(formData)
            : updateQuizSettings({ formData, id: props.id });

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
        console.log("sent", { ...quizSettings, timeLimit: toSeconds() });

        if (res.msg) {
            if (!props.config) {
                navigate("/create-questions/" + res.quizId);
            } else {
                props.refetch();
            }
        }
    };

    const fallbackToDefaultCover = () => {
        return quizSettings.coverImg
            ? BufferToObjUrl(quizSettings.coverImg.image.data.data)
            : quiziumImg;
    };

    return (
        <div
            style={{
                transition: "0.2s transform ease",
            }}
            className={`fixed top-0 right-0 bottom-0 left-0
         bg-[rgba(0,0,0,0.6)] z-[500] p-3  ${
             props.show ? "scale-1" : "scale-0"
         }`}
        >
            <form
                onSubmit={submitSetting}
                className="scrollbar w-full max-w-[700px] bg-mainBg p-5 
            px-6 pb-10 m-auto rounded overflow-y-auto h-full shadow"
            >
                <h2 className="text-[20px] font-bold isidoraBold">
                    Quiz Settings
                </h2>
                <div className="mt-5 flex flex-col md:flex-row md:items-start gap-4 md:gap-8 md:justify-between">
                    {/* Title , description , time limit and visibity container */}
                    <div className="flex-1 flex flex-col gap-16 md:gap-[97px]">
                        {/* Title and description container */}
                        <div className="h-[210px]">
                            {/* Title */}
                            <div className="flex flex-col justify-between mb-4">
                                <span className="text-[14px] font-bold mb-2">
                                    Title{" "}
                                    <span className="text-grayTwo text-[12px]">
                                        (required)
                                    </span>
                                </span>

                                <div className="relative">
                                    <span className="text-[12px] text-shinyPurple absolute right-2 top-[8px]">
                                        {70 - quizSettings.title.length}
                                    </span>
                                    <input
                                        onChange={handleQuizSettings}
                                        value={quizSettings.title}
                                        minLength={3}
                                        maxLength={70}
                                        required
                                        type="text"
                                        name="title"
                                        className="pl-3 pr-6 py-2 w-full text-textColor border-[1px]
                                border-grayTwo bg-transparent outline-none rounded
                            focus:border-shinyPurple text-[13px]"
                                        placeholder="Enter quiz title..."
                                    />
                                </div>
                            </div>
                            {/* Description */}
                            <div className="flex flex-col h-full">
                                <span className="mb-2 text-[14px] font-bold">
                                    Description{" "}
                                    <span className="text-grayTwo text-[12px]">
                                        (Optional)
                                    </span>
                                </span>

                                <div className="relative h-full">
                                    <span
                                        className="text-[12px] text-shinyPurple
                                     absolute right-2"
                                    >
                                        {500 - quizSettings.description.length}
                                    </span>
                                    <textarea
                                        onChange={handleQuizSettings}
                                        value={quizSettings.description}
                                        maxLength={500}
                                        type="text"
                                        name="description"
                                        className="resize-none px-3 py-2 w-full
                                 text-textColor border-[1px]
                        border-grayTwo h-36 bg-transparent outline-none
                         rounded focus:border-shinyPurple relative md:h-full textarea text-[13px]"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        {/* Time limit and visibity  */}
                        <div>
                            <div className="flex flex-col mb-4">
                                <span className="text-[14px] font-bold mb-2">
                                    Time limit{" "}
                                    <span className="text-grayTwo text-[12px]">
                                        (minimum -{" "}
                                        {quizSettings.applyTime === "entire"
                                            ? 1
                                            : 5}
                                        ,&nbsp; maximum -{" "}
                                        {quizSettings.applyTime === "entire"
                                            ? 120
                                            : 250}
                                        ),
                                    </span>
                                </span>

                                <div className="relative">
                                    <span
                                        className="text-[12px] text-shinyPurple
                                     absolute right-2 top-[10px]"
                                    >
                                        {quizSettings.applyTime === "entire"
                                            ? "minutes"
                                            : "seconds"}
                                    </span>
                                    {
                                        <input
                                            onChange={handleQuizSettings}
                                            onWheel={() => {
                                                //prevents time limit input from being modified while scrolling with mouse wheel
                                                timeLimitRef.current.blur();
                                            }}
                                            value={quizSettings.timeLimit}
                                            type="number"
                                            name="timeLimit"
                                            ref={timeLimitRef}
                                            required
                                            min={
                                                quizSettings.applyTime ===
                                                "entire"
                                                    ? 1
                                                    : 5
                                            }
                                            max={
                                                quizSettings.applyTime ===
                                                "entire"
                                                    ? 120
                                                    : 250
                                            }
                                            className="py-2 pl-3 pr-16 bg-transparent
                            border-grayTwo border rounded focus:border-shinyPurple
                             outline-none text-[13px] w-full"
                                            placeholder="Enter time limit..."
                                        />
                                    }

                                    {}
                                    {/* set limit for each questions or quiz as a whole */}
                                    <div className="flex items-center mt-2 text-[12px]">
                                        <input
                                            onChange={handleQuizSettings}
                                            type="radio"
                                            name="applyTime"
                                            value="entire"
                                            id="entire"
                                            checked={
                                                quizSettings.applyTime ===
                                                "entire"
                                            }
                                            className="cursor-pointer radio optionsChecked
                                        h-4 w-4 mt-1 mr-1 bg-transparent"
                                        />
                                        <label
                                            htmlFor="entire"
                                            className="mr-2 cursor-pointer"
                                        >
                                            For entire quiz
                                        </label>

                                        <input
                                            onChange={handleQuizSettings}
                                            type="radio"
                                            name="applyTime"
                                            value="each"
                                            id="each"
                                            checked={
                                                quizSettings.applyTime ===
                                                "each"
                                            }
                                            className="cursor-pointer radio optionsChecked h-4 w-4 
                                        mt-1 mr-1"
                                        />
                                        <label
                                            htmlFor="each"
                                            className="cursor-pointer"
                                        >
                                            For each questions
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <span className="text-[14px] font-bold mb-2">
                                    Visibility
                                </span>
                                <div className="flex items-center">
                                    <input
                                        onChange={handleQuizSettings}
                                        type="radio"
                                        name="visibility"
                                        value="public"
                                        id="public"
                                        checked={
                                            quizSettings.visibility === "public"
                                        }
                                        className="cursor-pointer radio optionsChecked
                                        h-4 w-4 mt-1 mr-1 bg-transparent"
                                    />
                                    <label
                                        htmlFor="public"
                                        className="mr-2 cursor-pointer"
                                    >
                                        Public
                                    </label>

                                    <input
                                        onChange={handleQuizSettings}
                                        type="radio"
                                        name="visibility"
                                        value="private"
                                        id="private"
                                        checked={
                                            quizSettings.visibility ===
                                            "private"
                                        }
                                        className="cursor-pointer radio optionsChecked h-4 w-4 
                                        mt-1 mr-1"
                                    />
                                    <label
                                        htmlFor="private"
                                        className="cursor-pointer"
                                    >
                                        Private
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Cover-image container and select subject container*/}
                    <div className="flex flex-col gap-12  flex-1">
                        <div className="h-[260px] flex flex-col gap-3">
                            <span className="text-[14px] font-bold">
                                Cover image{" "}
                                <span className="text-grayTwo text-[12px]">
                                    (File supported - .png, .jpg, .jpeg, .webp)
                                </span>
                            </span>
                            {/* Cover-image*/}

                            <div className="min-w-full rounded relative min-h-full">
                                {convertingImage && (
                                    <Loading
                                        cus={
                                            " loading-lg absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-shinyPurple"
                                        }
                                    />
                                )}
                                <img
                                    src={
                                        pickedImage
                                            ? URL.createObjectURL(pickedImage)
                                            : fallbackToDefaultCover()
                                    }
                                    className="w-full h-full object-cover rounded shadow-md"
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

                        {/* Subjects */}
                        <div className=" flex flex-col">
                            <span className="mb-2 text-[14px] font-bold">
                                Category
                            </span>
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
                                    "Miscellaneuos",
                                ].map((o, k) => {
                                    return (
                                        <option
                                            key={k}
                                            value={o}
                                            className="bg-mainBg"
                                        >
                                            {o}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
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
                                        })
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
