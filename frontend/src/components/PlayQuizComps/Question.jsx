import { useEffect, useState } from "react";
import quizium from "../../assets/images/defaultCover/quizium-4.webp";
import Options from "./QuestionComps/Options";
import bufferToObjUrl from "../../utils/bufferToObjUrl";
import TypeAnswer from "./QuestionComps/TypeAnswer";
import { toast } from "react-hot-toast";
import TrueFalse from "./QuestionComps/TrueFalse";
import Explanation from "./QuestionComps/Explanation";
import NavLeftRight from "./NavLeftRight";
import Warning from "../ui/Warning";
const Question = ({
    singleQuestion,
    allQuestionsResults,
    setAllQuestionsResults,
    currentQuestion,
    findQuestionResult,
    allQuestions,
    setCurrentQuestion,
    startQuiz,
    selectAnswer,
    timeSpent,
}) => {
    const { question, options } = singleQuestion;
    const [showExplanation, setShowExplanation] = useState(false);

    const setSeenExplanation = (id = singleQuestion._id) => {
        const updatedAllQuizResults = allQuestionsResults.map((result) => {
            return result.questionId === id
                ? { ...result, seenExplanation: true }
                : result;
        });
        setAllQuestionsResults(updatedAllQuizResults);
    };

    const optionsToRender = () => {
        if (singleQuestion.questionType === "trueFalse") {
            return (
                <TrueFalse
                    findQuestionResult={findQuestionResult}
                    selectAnswer={selectAnswer}
                    timeSpent={timeSpent}
                />
            );
        } else if (singleQuestion.questionType === "typeAnswer") {
            return (
                <TypeAnswer
                    selectAnswer={selectAnswer}
                    findQuestionResult={findQuestionResult}
                    currentQuestion={currentQuestion}
                    singleQuestion={singleQuestion}
                    timeSpent={timeSpent}
                />
            );
        } else {
            return (
                <Options
                    options={options}
                    allQuestionsResults={allQuestionsResults}
                    setAllQuestionsResults={setAllQuestionsResults}
                    singleQuestion={singleQuestion}
                    currentQuestion={currentQuestion}
                    findQuestionResult={findQuestionResult}
                    selectAnswer={selectAnswer}
                    timeSpent={timeSpent}
                />
            );
        }
    };

    useEffect(() => {
        setShowExplanation(false);
    }, [singleQuestion]);

    return (
        <div
            className="flex pt-3 flex-col m-auto
        px-5 gap-3 w-full smd:max-w-[580px] 
        lg:max-w-[570px] relative min-h-[400px]"
        >
            {findQuestionResult() && singleQuestion.explanation && (
                <button
                    onClick={() => {
                        setShowExplanation(!showExplanation);
                        setSeenExplanation();
                    }}
                    className="bg-grayOne absolute top-[-10px]
             text-[12px] py-1 px-2 rounded flex items-end z-10 gap-2"
                >
                    <span>Show Explanation</span>{" "}
                    <span
                        style={{
                            transition: "transform 0.2s",
                        }}
                        className={`bi-chevron-down translate-y-[1px] ${
                            showExplanation && "rotate-[-180deg]"
                        }`}
                    ></span>
                    {!findQuestionResult().seenExplanation && (
                        <Warning cus={`top-[-5px]`} />
                    )}
                </button>
            )}

            {
                <>
                    <div className="w-full">
                        <h2
                            className={` isidoraBold text-center break-words ${
                                !singleQuestion.image
                                    ? "text-3xl"
                                    : "text-[18px]"
                            }`}
                        >
                            {question}
                        </h2>
                    </div>
                    {singleQuestion.image && (
                        <div className="w-full h-[280px] shadow">
                            <img
                                src={bufferToObjUrl(
                                    singleQuestion.image.image.data.data
                                )}
                                className="w-full h-full rounded object-contain"
                                alt=""
                            />
                        </div>
                    )}
                </>
            }

            {!singleQuestion.image && <div className="mt-20"></div>}
            {singleQuestion.questionType ? optionsToRender() : ""}
            {showExplanation && (
                <Explanation explanation={singleQuestion.explanation} />
            )}
        </div>
    );
};

export default Question;
