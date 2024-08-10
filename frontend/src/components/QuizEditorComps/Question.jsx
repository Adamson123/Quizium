import { useEffect, useRef, useState } from "react";
import BufferToObjUrl from "../../utils/bufferToObjUrl";
import Warning from "../ui/Warning";
import { convertToWebp } from "../../utils/convertToWebp";
import Loading from "../ui/Loading";
import Options from "./QuestionComps/Options";
import TrueFalse from "./QuestionComps/TrueFalse";
import TypeAnswer from "./QuestionComps/TypeAnswer";

const Question = ({
    allQuestions,
    setAllQuestions,
    singleQuestion,
    currentQuestion,
    imagePicked,
    setPickedImage,
    allQuestions_2,
    handleDeleteQuiz,
}) => {
    const questionRef = useRef(null);
    const uploadRef = useRef();

    // adding text to options if allQuestion array has been populated (it's latest version has been updated in the server)
    useEffect(() => {
        if (allQuestions_2 === allQuestions) {
            questionRef.current.innerText = singleQuestion.question;
        }
    }, [singleQuestion, currentQuestion]);

    //will be called when user is typing...
    const updateQuestion = (event) => {
        const updatedSingleQuestion = {
            ...singleQuestion,
            question: event.target.innerText,
        };

        const updatedMultipleQuestion = allQuestions.map((q, i) => {
            return i !== currentQuestion ? q : updatedSingleQuestion;
        });
        setAllQuestions(updatedMultipleQuestion);
    };

    //for updating answer , specifically for "quiz" and "trueFalse" type quizzes
    const updateAnswer = (event) => {
        const modifyAnswerArray = () => {
            //remove the value if it is already part of the answer array
            if (singleQuestion.answer.includes(event.target.value)) {
                return singleQuestion.answer.filter((a) => {
                    return a !== event.target.value;
                });
            } else {
                //else join it with other answers
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

        event.target.value = "";
    };

    const optionsToRender = () => {
        if (singleQuestion.questionType === "trueFalse") {
            return (
                <TrueFalse
                    updateAnswer={updateAnswer}
                    singleQuestion={singleQuestion}
                />
            );
        } else if (singleQuestion.questionType === "typeAnswer") {
            return (
                <TypeAnswer
                    singleQuestion={singleQuestion}
                    currentQuestion={currentQuestion}
                    allQuestions={allQuestions}
                    allQuestions_2={allQuestions_2}
                    setAllQuestions={setAllQuestions}
                />
            );
        } else {
            return (
                <Options
                    updateAnswer={updateAnswer}
                    singleQuestion={singleQuestion}
                    setAllQuestions={setAllQuestions}
                    currentQuestion={currentQuestion}
                    allQuestions={allQuestions}
                    allQuestions_2={allQuestions_2}
                />
            );
        }
    };

    return (
        <div className="w-full smd:max-w-[580px] lg:max-w-[570px] m-auto">
            {/*  Enter Question */}

            <div
                className="bg-mainBg border border-grayOne rounded text-center
                         text-[15px] p-2 w-full h-auto text-wrap break-words flex
                        items-center justify-center relative mb-4"
            >
                <div
                    onInput={updateQuestion}
                    className="w-full font-bold outline-none overflow-y-auto max-h-full"
                    contentEditable
                    data-placeholder="Enter question..."
                    ref={questionRef}
                />
                {!singleQuestion.question?.trim(" ") && (
                    <Warning text={"Field should not be empty"} />
                )}
            </div>
            {/* Upload Image */}
            <div>
                {/* Change Image */}

                {singleQuestion.image && (
                    <div
                        className="bg-red-600 w-full px-1 pt-1 pb-2 rounded insetShadow
                     flex justify-between"
                    >
                        <button
                            onClick={() => handleDeleteQuiz("")}
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
                                    : BufferToObjUrl(
                                          singleQuestion.image.image.data.data
                                      )
                            }
                            className="h-full w-full object-top"
                            alt="question based on quiz question"
                        />
                    )}
                </div>
            </div>

            {/*  Enter Options */}
            <div className="flex flex-col gap-4 mt-10">{optionsToRender()}</div>
        </div>
    );
};

export default Question;
