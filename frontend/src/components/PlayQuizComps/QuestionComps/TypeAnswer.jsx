import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const TypeAnswer = ({
    findQuestionResult,
    selectAnswer,
    currentQuestion,
    singleQuestion,
    timeSpent,
}) => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.innerText =
            findQuestionResult() && findQuestionResult().userAnswer.length
                ? findQuestionResult().userAnswer[0]
                : "";
    }, [currentQuestion, singleQuestion]);

    const validAnsCondtion =
        singleQuestion.answer.length > 1 || !findQuestionResult()?.correct;

    console.log(findQuestionResult(), "type ans");

    const showOtherValidAns = (ans) => {
        if (findQuestionResult()?.userAnswer.length) {
            return (
                findQuestionResult()?.userAnswer.length &&
                findQuestionResult()?.userAnswer[0].trim(" ").toLowerCase() !==
                    ans.toLowerCase()
            );
        } else {
            return (
                findQuestionResult() && !findQuestionResult()?.userAnswer.length
            );
        }
    };

    return (
        <div className="flex flex-col items-center gap-2 relative">
            <div className="h-[25px] flex items-end gap-2">
                {findQuestionResult() && validAnsCondtion && (
                    <>
                        <div className="text-[15px] isidoraBold">
                            {findQuestionResult().correct
                                ? "Other valid Answers :"
                                : "Valid Answers :"}
                        </div>
                        <div className="flex gap-2 text-[15px]">
                            {singleQuestion.answer.map((ans, index) => {
                                //show valid answets, and the one that is provided should be skipped if correct
                                return (
                                    showOtherValidAns(ans) && (
                                        <span
                                            className="text-green-500"
                                            key={index}
                                        >
                                            {ans} ,
                                        </span>
                                    )
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
            <div
                ref={inputRef}
                contentEditable={findQuestionResult() ? false : true}
                className="p-2 text-[15px] w-full text-center 
            outline-none rounded text-white py-5 border border-grayOne min-h-[70px]"
                data-placeholder="Enter Answer..."
            ></div>

            {findQuestionResult() && (
                <span
                    className={` ${
                        findQuestionResult().correct
                            ? "bi-check text-green-500"
                            : "bi-x text-red-500"
                    } absolute text-[27px] right-2 top-[65%] translate-y-[-50%] font-bold`}
                ></span>
            )}
            {!findQuestionResult() && (
                <button
                    onClick={() => {
                        if (
                            !inputRef.current.innerText.trim(" ") &&
                            !findQuestionResult()
                        ) {
                            return toast.error("Please input your answer");
                        }
                        selectAnswer([inputRef.current.innerText.trim(" ")]);
                        // inputRef.current.innerText = "";
                    }}
                    className="bg-shinyPurple w-[110px] py-2 rounded 
                     clickable insetShadow text-[14px] isidoraSemiBold"
                >
                    Submit Answer
                </button>
            )}
        </div>
    );
};

export default TypeAnswer;
