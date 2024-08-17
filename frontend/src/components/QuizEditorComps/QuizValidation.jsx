import { memo } from "react";
import Warning from "../ui/Warning";
import analizeQuiz from "./analizeQuiz";

const QuizValidation = memo(({ saveOptionConfig }) => {
    const {
        allQuestions,
        showQuizValid,
        setShowQuizValid,
        setCurrentQuestion,
    } = saveOptionConfig;

    console.log("quiz validation rendered");

    return (
        <div
            style={{
                transition: "transform 0.2s",
            }}
            className={`fixed top-0 right-0 bottom-0 left-0
         bg-[rgba(0,0,0,0.7)] z-50 px-4 flex justify-center 
         items-center rounded ${showQuizValid ? "scale-1" : "scale-0"}`}
        >
            <div className="p-2 pb-4 bg-mainBg w-full max-w-[400px] max-h-[550px]">
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-center isidoraBold mt-2">
                        Quiz Validation Result
                    </h2>
                    <div
                        className="bg-[rgba(247,3,3,0.52)] w-[45px] h-[45px] rounded-full
                    flex justify-center items-center mt-2"
                    >
                        <Warning
                            absolute={false}
                            cus={"w-[30px] h-[30px] text-[25px]"}
                        />
                    </div>
                </div>

                {/* Error messages container */}
                <div
                    className="flex flex-col rounded gap-2 max-h-[375px] 
                overflow-y-auto bg-[rgba(0,0,0,0.5)] p-2 mt-5"
                >
                    {/* message */}

                    {analizeQuiz(allQuestions) &&
                        analizeQuiz(allQuestions).map((question, index) => {
                            return (
                                <div
                                    onClick={() => {
                                        setCurrentQuestion(question.index);
                                        setShowQuizValid(false);
                                    }}
                                    className="flex cursor-pointer"
                                    key={index}
                                >
                                    {/* index */}
                                    <div
                                        className=" py-2 w-[65px] border border-grayOne font-bold
                         text-grayOne text-[22px] flex items-center justify-center"
                                    >
                                        {question.index + 1}
                                    </div>
                                    {/* text */}
                                    <div
                                        className="flex flex-col justify-start
                                         border border-grayOne py-1 px-2
                                       border-l- w-full h-[65px]"
                                    >
                                        {/* message text */}
                                        {question.questionError && (
                                            <p className="flex items-center text-[10px] gap-1">
                                                <Warning absolute={false} />
                                                <span className="mb-[3px]">
                                                    {question.questionError}
                                                </span>
                                            </p>
                                        )}

                                        {question.optionsError && (
                                            <p className="flex items-center text-[10px] gap-1">
                                                <Warning absolute={false} />
                                                <span className="mb-[3px]">
                                                    {question.optionsError}
                                                </span>
                                            </p>
                                        )}
                                        {question.answerError && (
                                            <p className="flex items-center text-[10px] gap-1">
                                                <Warning absolute={false} />
                                                <span className="mb-[3px]">
                                                    {question.answerError}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                </div>
                <div className="flex justify-center mt-3">
                    <button
                        onClick={() => setShowQuizValid(false)}
                        className="px-3 py-2 bg-shinyPurple rounded
                     insetShadow isidoraBold clickable"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
});

export default QuizValidation;
