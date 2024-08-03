import { useEffect, useRef, useState } from "react";
import BufferToObjUrl from "../../utils/BufferToObjUrl";
import Warning from "../ui/Warning";
import { convertToWebp } from "../../utils/convertToWebp";
import Loading from "../ui/Loading";
import Options from "./Options";

const Question = ({
    allQuestions,
    setAllQuestions,
    singleQuestion,
    currentQuestion,
    imagePicked,
    setPickedImage,
    allQuestions_2,
}) => {
    const questionRef = useRef(null);

    const acceptedAns = useRef([]);
    const uploadRef = useRef();

    // adding text to options if singleQuestion array has been populated and it's latest version has been updated in the server
    useEffect(() => {
        if (singleQuestion && allQuestions_2 === allQuestions) {
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

    //for updating answer
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
    };

    useEffect(() => {
        if (
            acceptedAns.current.length &&
            singleQuestion.questionType === "typeAnswer" &&
            singleQuestion &&
            allQuestions_2 === allQuestions
        ) {
            acceptedAns.current.forEach((_, i) => {
                acceptedAns.current[i].innerText = singleQuestion.answer[i];
            });
        }
        console.log(acceptedAns);
    }, [singleQuestion, currentQuestion]);

    const updateAnswerForTypeAnswer = (event, index) => {
        const filterAnswer = singleQuestion.answer.map((ans, i) => {
            return i === index ? event.target.innerText : ans;
        });

        console.log(filterAnswer);
        const updatedSingleQuestion = {
            ...singleQuestion,
            answer:
                singleQuestion.answer.length - 1 < index
                    ? [...singleQuestion.answer, event.target.innerText]
                    : filterAnswer,
        };

        const updatedMultipleQuestion = allQuestions.map((q, i) => {
            return i !== currentQuestion ? q : updatedSingleQuestion;
        });

        setAllQuestions(updatedMultipleQuestion);
    };

    const optionsToRender = () => {
        if (singleQuestion.questionType === "trueFalse") {
            return (
                <div className="flex gap-4">
                    <div
                        className="relative
            rounded text-center 
            p-2 px-10 w-full min-h-36 text-wrap break-words
            flex items-center justify-center cursor-pointer clickable
             bg-mainBg text-2xl insetShadow"
                    >
                        <input
                            onChange={updateAnswer}
                            type="radio"
                            checked={singleQuestion.answer.includes("true")}
                            className="absolute left-3 
                               checked:bg-grayOne w-7 h-7 radio top-3"
                            name="option"
                            value="true"
                        />
                        True
                    </div>
                    <div
                        className="relative
            rounded text-cente
            p-2 px-10 w-full min-h-36 text-wrap break-words
            flex items-center justify-center cursor-pointer 
            clickable bg-red-600  text-2xl  insetShadow"
                    >
                        <input
                            onChange={updateAnswer}
                            type="radio"
                            checked={singleQuestion.answer.includes("false")}
                            className="absolute left-3 
                            checked:bg-red-600  w-7 h-7 radio top-3"
                            name="option"
                            value="false"
                        />
                        False
                    </div>
                </div>
            );
        } else if (singleQuestion.questionType === "typeAnswer") {
            return (
                <div className="flex flex-col items-center gap-3">
                    <div
                        className="p-2 text-[15px] w-full text-center 
                        outline-none rounded text-white py-5 border border-grayOne"
                        data-placeholder="Enter Answer..."
                        contentEditable="true"
                        ref={(el) => {
                            acceptedAns.current[0] = el;
                        }}
                        onInput={(event) => updateAnswerForTypeAnswer(event, 0)}
                    ></div>
                    <div className="px-4 py-2 bg-grayTwo text-[12px]">
                        {" "}
                        Other Valid Answers{" "}
                    </div>
                    <div
                        className="p-2 text-[15px] w-full text-center 
                        outline-none rounded text-white py-5 border border-grayOne"
                        data-placeholder="Enter Answer..."
                        contentEditable="true"
                        ref={(el) => {
                            acceptedAns.current[1] = el;
                        }}
                        onInput={(event) => updateAnswerForTypeAnswer(event, 1)}
                    ></div>
                    <div
                        className="p-2 text-[15px] w-full text-center 
                        outline-none rounded text-white py-5 border border-grayOne"
                        data-placeholder="Enter Answer..."
                        contentEditable="true"
                        ref={(el) => {
                            acceptedAns.current[2] = el;
                        }}
                        onInput={(event) => updateAnswerForTypeAnswer(event, 2)}
                    ></div>
                </div>
            );
        } else {
            const options = (
                <Options
                    updateAnswer={updateAnswer}
                    singleQuestion={singleQuestion}
                    setAllQuestions={setAllQuestions}
                    currentQuestion={currentQuestion}
                    allQuestions={allQuestions}
                    allQuestions_2={allQuestions_2}
                />
            );
            return options;
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
                    className="w-full font-bold outline-none overflow-y-auto max-h-full"
                    contentEditable
                    data-placeholder="Enter question..."
                    ref={questionRef}
                />
                {singleQuestion && !singleQuestion.question.trim(" ") && (
                    <Warning text={"Field should not be empty"} />
                )}
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
                {singleQuestion && optionsToRender()}
            </div>
        </div>
    );
};

export default Question;
