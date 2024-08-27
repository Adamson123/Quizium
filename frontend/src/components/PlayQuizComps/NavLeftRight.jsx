import React from "react";
import toast from "react-hot-toast";

const NavLeftRight = ({
    currentQuestion,
    setCurrentQuestion,
    allQuestions,
    questionNavRef,
    setShowConfirm,
    setStartQuiz,
    allQuestionsResults,
    applyTime,
    findQuestionResult,
}) => {
    const condition = () => {
        if (applyTime === "entire") {
            return applyTime === "entire";
        } else {
            return applyTime === "each" && findQuestionResult();
        }
    };

    return (
        <div
            className={`flex justify-between w-full
                   smd:max-w-[580px] 
                 lg:max-w-[570px] m-auto px-2`}
        >
            {
                <button
                    onClick={() => {
                        if (currentQuestion > 0 && condition()) {
                            setCurrentQuestion(currentQuestion - 1);
                            if (questionNavRef.current)
                                questionNavRef.current.scrollLeft -= 50;
                        }
                    }}
                    className={`bg-grayFive py-2 px-3 rounded isidoraBold
                 insetShadow text-[13px] clickable flex items-center 
                 gap-1 ${
                     currentQuestion > 0 && condition()
                         ? "opacity-1 pointer-events-auto"
                         : "opacity-0 pointer-events-none"
                 }`}
                >
                    <span
                        className="bi-arrow-left-short
                     font-bold text-[17px]"
                    ></span>{" "}
                    {/* <span>Previous</span> */}
                </button>
            }
            <button
                onClick={() => {
                    if (!allQuestionsResults.length) {
                        return toast.error("Answer atleast one question");
                    }
                    setShowConfirm(true);
                }}
                className="bg-red-600 text-[12px] px-2 
            rounded insetShadow clickable isidoraBold"
            >
                Submit Quiz
            </button>
            {
                <button
                    onClick={() => {
                        if (
                            currentQuestion < allQuestions.length - 1 &&
                            condition()
                        ) {
                            setCurrentQuestion(currentQuestion + 1);
                            if (questionNavRef.current)
                                questionNavRef.current.scrollLeft += 50;
                        }
                    }}
                    className={`bg-shinyPurple py-2 px-3 rounded isidoraBold
                      insetShadow text-[13px] clickable flex items-center 
                      gap-1 ${
                          currentQuestion < allQuestions.length - 1 &&
                          condition()
                              ? "opacity-1 pointer-events-auto"
                              : "opacity-0 pointer-events-none"
                      }`}
                >
                    {/* <span>Next</span> */}
                    <span
                        className="bi-arrow-right-short
                     font-bold text-[17px]"
                    ></span>{" "}
                </button>
            }
        </div>
    );
};

export default NavLeftRight;
