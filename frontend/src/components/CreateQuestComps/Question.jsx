import { useEffect, useRef, useState } from "react";
import BufferToObjUrl from "../../utils/BufferToObjUrl";
import Warning from "../ui/Warning";
import { convertToWebp } from "../../utils/convertToWebp";
import Loading from "../ui/Loading";

const Question = ({
    allQuestions,
    setAllQuestions,
    singleQuestion,
    currentQuestion,
    imagePicked,
    setPickedImage,
}) => {
    const questionRef = useRef(null);
    const optionRefs = useRef([]);
    const uploadRef = useRef();

    const [optionsTextColor, setOptionsTextColor] = useState([
        "#e779c1",
        "#408fb9",
        "#e8bf05",
        "#e48775",
    ]);

    const [optionsText, setOptionsText] = useState([]);
    const [questionText, setQuestionText] = useState("");

    // displaying question and options if singleQuestion array has been populated
    useEffect(() => {
        if (singleQuestion) {
            questionRef.current.innerText = singleQuestion.question;

            // Add text to options
            singleQuestion.options.forEach((option, i) => {
                optionRefs.current[i].innerText = option.text;
            });

            setOptionsText(singleQuestion.options);
            setQuestionText(singleQuestion.question);
        }
    }, [singleQuestion, currentQuestion]);

    const updateOptions = (event, id) => {
        const updatedOption = optionsText.map((o) => {
            return o._id !== id ? o : { ...o, text: event.target.innerText };
        });
        setOptionsText(updatedOption);
    };

    //will be called when mouse is out, and will update options in the main allQuestions array
    const updateMainOptions = () => {
        //replacing  old options with optionsText
        if (optionsText !== singleQuestion.options) {
            const updatedSingleQuestion = {
                ...singleQuestion,
                options: optionsText,
            };

            const updatedMultipleQuestion = allQuestions.map((q, i) => {
                return i !== currentQuestion ? q : updatedSingleQuestion;
            });
            setAllQuestions((a) => (a = updatedMultipleQuestion));
        }
    };

    //will be called when user is typing...
    const updateQuestion = (event) => {
        setQuestionText(event.target.innerText);
    };

    //will be called when mouse is out, and will update question in the main allQuestions array
    const updateMainQuestion = () => {
        if (questionText !== singleQuestion.question) {
            const updatedSingleQuestion = {
                ...singleQuestion,
                question: questionText,
            };

            const updatedMultipleQuestion = allQuestions.map((q, i) => {
                return i !== currentQuestion ? q : updatedSingleQuestion;
            });

            setAllQuestions(updatedMultipleQuestion);
        }
    };

    //for updating answer
    const updateAnswer = (event) => {
        const modifyAnswerArray = () => {
            if (singleQuestion.answer.includes(event.target.value)) {
                return singleQuestion.answer.filter((a) => {
                    return a !== event.target.value;
                });
            } else {
                return [...singleQuestion.answer, event.target.value];
            }
        };

        const updatedSingleQuestion = {
            ...singleQuestion,
            answer:
                singleQuestion.answerOption === "singleAnswer"
                    ? [event.target.value]
                    : modifyAnswerArray(),
        };

        const updatedMultipleQuestion = allQuestions.map((q, i) => {
            return i !== currentQuestion ? q : updatedSingleQuestion;
        });

        setAllQuestions(updatedMultipleQuestion);
    };

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
    };

    return (
        <div className="w-full smd:max-w-[580px] lg:max-w-[570px] m-auto">
            {/*  Enter Question */}

            <div
                className="bg-mainBg border border-grayOne rounded text-center
                         text-[15px] p-2 w-full h-auto text-wrap break-words flex
                        items-center justify-center relative"
            >
                <div
                    onInput={updateQuestion}
                    onMouseOut={updateMainQuestion}
                    className="w-full font-bold outline-none overflow-y-auto max-h-full"
                    contentEditable
                    data-placeholder="Enter question..."
                    ref={questionRef}
                />
                {singleQuestion && !singleQuestion.question && <Warning />}
            </div>
            {/* Upload Image */}
            <div
                className={`w-full h-[300px] border-2 border-grayOne mt-4 rounded 
                            relative m-auto`}
            >
                <input
                    onChange={updateImage}
                    ref={uploadRef}
                    type="file"
                    className="absolute w-0 h-0 pointer-events-none opacity-0"
                    accept=".png, .jpg, .jpeg, .webp"
                />
                <div
                    className="absolute top-[50%] bottom-[50%] flex flex-col justify-center items-center
                           gap-2 w-full fill text-grayTwo"
                >
                    {imagePicked && (
                        <Loading
                            cus={
                                " loading-lg absolute top-[-75px] bg-shinyPurple"
                            }
                        />
                    )}
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

                {((singleQuestion && singleQuestion.image) || imagePicked) && (
                    <img
                        src={
                            imagePicked
                                ? URL.createObjectURL(imagePicked)
                                : BufferToObjUrl(
                                      singleQuestion.image.image.data.data
                                  )
                        }
                        className="h-full w-full object-cover"
                        alt="question based on quiz question"
                    />
                )}
            </div>

            {/*  Enter Options */}
            <div className="flex flex-col gap-4 mt-10">
                {singleQuestion &&
                    singleQuestion.options.map((option, i) => {
                        return (
                            <div
                                style={{
                                    borderColor: optionsTextColor[i],
                                    color: optionsTextColor[i],
                                }}
                                key={i}
                                className={`relative bg-mainBg border-2
                                rounded text-center
                                text-[15px] p-2 px-10 w-full min-h-16 text-wrap break-words
                                flex items-center justify-center`}
                            >
                                <input
                                    onChange={updateAnswer}
                                    style={{
                                        borderColor: optionsTextColor[i],
                                    }}
                                    value={option._id}
                                    checked={singleQuestion.answer.includes(
                                        option._id
                                    )}
                                    type={
                                        singleQuestion.answerOption ===
                                        "singleAnswer"
                                            ? "radio"
                                            : "checkbox"
                                    }
                                    className={`absolute left-3 ${
                                        singleQuestion.answerOption ===
                                        "singleAnswer"
                                            ? `radio optionChecked${i}`
                                            : `checkbox`
                                    } w-5 h-5 ${i} `}
                                    name="option"
                                />

                                <div
                                    onInput={(event) =>
                                        updateOptions(event, option._id)
                                    }
                                    onMouseOut={updateMainOptions}
                                    className={`w-full outline-none overflow-y-auto  max-h-full`}
                                    contentEditable
                                    data-placeholder="Enter option..."
                                    ref={(el) => (optionRefs.current[i] = el)}
                                />
                                {!option.text && <Warning />}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Question;
