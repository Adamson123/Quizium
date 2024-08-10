import { useEffect, useMemo, useState } from "react";
import bufferToObj from "../../utils/bufferToObj";

const RightSection = ({
    singleQuestion,
    // setSingleQuestion,
    setAllQuestions,
    allQuestions,
    currentQuestion,
    showRightSect,
    setShowRightSect,
    handleDeleteQuiz,
    handleCreateQuiz,
    handleUpdateQuiz,
}) => {
    const [explanation, setExplantion] = useState(singleQuestion.explanation);

    useEffect(() => {
        setExplantion(allQuestions[currentQuestion]?.explanation);
    }, [currentQuestion]);

    const updateExplanation = () => {
        if (explanation !== singleQuestion.explanation) {
            const updatedSingleQuestion = {
                ...singleQuestion,
                explanation,
            };

            const updatedMultipleQuestion = allQuestions.map((q, i) => {
                return i !== currentQuestion ? q : updatedSingleQuestion;
            });
            setAllQuestions(updatedMultipleQuestion);
        }
    };

    const updateAnswerOption = (event) => {
        const updatedSingleQuestion = {
            ...singleQuestion,
            answerOption: event.target.value,
            answer: [],
        };

        const updatedMultipleQuestion = allQuestions.map((q, i) => {
            return i !== currentQuestion ? q : updatedSingleQuestion;
        });

        setAllQuestions(updatedMultipleQuestion);
    };

    const updateQuestionType = (event) => {
        //only update  if the question type been switched to is not the same as the old question type
        if (event.target.value === singleQuestion.questionType) {
            return;
        }

        const emptiedTextOption = singleQuestion.options.map((option) => {
            return { ...option, text: "" };
        });

        const updatedSingleQuestion = {
            ...singleQuestion,
            questionType: event.target.value,
            answerOption:
                event.target.value === "trueFalse"
                    ? "singleAnswer"
                    : singleQuestion.answerOption,
            answer: [],
            options:
                (singleQuestion.questionType !== "quiz") &
                (event.target.value === "quiz")
                    ? emptiedTextOption
                    : singleQuestion.options,
        };

        const updatedMultipleQuestion = allQuestions.map((q, i) => {
            return i !== currentQuestion ? q : updatedSingleQuestion;
        });

        setAllQuestions(updatedMultipleQuestion);
    };

    const duplicateQuiz = () => {
        const { question, explanation, questionType, answerOption, answer } =
            singleQuestion;
        const options = singleQuestion.options.map((op) => {
            return { text: op.text, isCorrect: op.isCorrect };
        });

        console.log(answer);
        const quizInfo = {
            question,
            explanation,
            questionType,
            answerOption,
            options,
            answer: singleQuestion.questionType === "quiz" ? [] : answer,
        };
        const image = bufferToObj(singleQuestion.image?.image.data.data);
        handleCreateQuiz(quizInfo, image, true);
        handleUpdateQuiz();
    };

    return (
        <div
            className={`fixed right-0 top-0 bottom-0 bg-mainBg ${
                !showRightSect
                    ? "w-0 overflow-y-hidden"
                    : "w-[350px] overflow-y-auto"
            }
          slg:border-l lg:border-none border-grayOne slg:w-[350px] pt-20 z-10`}
            style={{
                transition: "width 0.3s ease-in-out",
            }}
        >
            {/* close  right sect */}
            <span
                onClick={() => setShowRightSect(false)}
                className="bi-x absolute top-16 right-4 text-3xl 
                text-grayTwo cursor-pointer slg:hidden"
            ></span>

            <div className="flex flex-col gap-6">
                {/* Question type */}
                <div className="flex-col px-4">
                    <span className="isidoraBold">Question Type</span>
                    <select
                        onChange={updateQuestionType}
                        className="w-full mt-2 bg-transparent border 
                    p-2 border-grayOne rounded outline-none"
                        value={singleQuestion.questionType}
                    >
                        <option value="quiz" className="bg-mainBg">
                            Quiz
                        </option>
                        <option value="trueFalse" className="bg-mainBg">
                            True or false
                        </option>
                        <option value="typeAnswer" className="bg-mainBg">
                            Type Answer
                        </option>
                    </select>
                </div>
                <div className="flex-col px-4">
                    {/* Answer Option */}
                    <span className="isidoraBold">Answer Option</span>
                    <select
                        onChange={updateAnswerOption}
                        className="w-full bg-transparent border 
                        p-2 border-grayOne rounded outline-none mt-2 disabled:opacity-[0.3]"
                        value={singleQuestion.answerOption}
                        disabled={singleQuestion.questionType !== "quiz"}
                    >
                        <option value="singleAnswer" className="bg-mainBg">
                            Single answer
                        </option>
                        <option value="multiSelect" className="bg-mainBg">
                            Multi-select
                        </option>
                    </select>
                </div>
                <div className="flex-col px-4 relative">
                    {/* Description */}
                    <span className="isidoraBold relative">Explanation</span>
                    <span className="text-[13px] absolute top-[35px] right-6 text-shinyPurple">
                        {explanation ? 500 - explanation.length : 500}
                    </span>
                    <textarea
                        value={explanation}
                        onMouseOut={updateExplanation}
                        onBlur={updateExplanation}
                        onChange={(event) => {
                            setExplantion(event.target.value);
                        }}
                        maxLength={500}
                        className="w-full h-[180px] p-5 resize-none border-grayOne textarea rounded-none mt-2 bg-mainBg"
                    ></textarea>
                </div>
                <div className="flex justify-center items-center gap-3 mt-4 px-3">
                    <button
                        onClick={() => handleDeleteQuiz(singleQuestion._id)}
                        className="bg-red-500 clickable rounded
                     insetShadow isidoraBold text-[13px] py-[9px] px-[50px]"
                    >
                        Delete
                    </button>
                    <button
                        onClick={duplicateQuiz}
                        className="bg-green-500 clickable rounded
                     insetShadow isidoraBold text-[13px] py-[9px] px-[50px]"
                    >
                        Duplicate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RightSection;
