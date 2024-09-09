//REMEMBER justify center kinda affect overflow-auto divs
const QuestionsNav = ({
    allQuestions,
    currentQuestion,
    setCurrentQuestion,
    findQuestionResult,
    questionNavRef,
}) => {
    return (
        <div
            ref={questionNavRef}
            className="flex gap-1  overflow-x-auto
         overflow-y-hidden max-w-full scrollbar py-2"
        >
            {allQuestions.map((quest, index) => {
                return (
                    <button
                        onClick={() => {
                            setCurrentQuestion(index);
                        }}
                        key={index}
                        className={`bg-grayOne min-w-8 min-h-8 
                        rounded-full isidoraBold flex items-center justify-center ${
                            currentQuestion === index && "border-2 border-white"
                        } ${
                            findQuestionResult(quest?._id) &&
                            (findQuestionResult(quest?._id).correct
                                ? "bg-green-400"
                                : "bg-red-500")
                        }`}
                    >
                        {index + 1}
                    </button>
                );
            })}
        </div>
    );
};

export default QuestionsNav;
