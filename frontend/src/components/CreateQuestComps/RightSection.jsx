import { useEffect, useMemo, useState } from "react";

const RightSection = ({
    singleQuestion,
    // setSingleQuestion,
    setAllQuestions,
    allQuestions,
    currentQuestion,
    showRightSect,
    setShowRightSect,
}) => {
    const [explanation, setExplantion] = useState(singleQuestion.explanation);

    useEffect(() => {
        setExplantion(allQuestions[currentQuestion].explanation);
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
        const updatedSingleQuestion = {
            ...singleQuestion,
            questionType: event.target.value,
        };

        const updatedMultipleQuestion = allQuestions.map((q, i) => {
            return i !== currentQuestion ? q : updatedSingleQuestion;
        });

        setAllQuestions(updatedMultipleQuestion);
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

            <div className="flex flex-col gap-4">
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
                        p-2 border-grayOne rounded outline-none mt-2"
                        value={singleQuestion.answerOption}
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
                    <span className="text-[13px] absolute top-[35px] right-6">
                        {explanation ? 500 - explanation.length : 500}
                    </span>
                    <textarea
                        value={explanation}
                        onMouseOut={updateExplanation}
                        onChange={(event) => {
                            setExplantion(event.target.value);
                        }}
                        maxLength={500}
                        className="w-full h-[180px] p-5 resize-none textarea rounded-none mt-2"
                    >
                        {/* {singleQuestion.explanation} */}
                    </textarea>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <button
                        className="bg-red-500 clickable rounded
                     insetShadow isidoraBold text-[13px] py-[9px] px-[57px]"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RightSection;
