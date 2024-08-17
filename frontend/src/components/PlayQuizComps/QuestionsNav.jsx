const QuestionsNav = ({
    questionsAmount,
    currentQuestion,
    setCurrentQuestion,
}) => {
    return (
        <div className="flex gap-1">
            {Array.from({ length: questionsAmount }).map((_, index) => {
                return (
                    <button
                        onClick={() => {
                            setCurrentQuestion(index);
                        }}
                        key={index}
                        className={`bg-grayOne w-8 h-8
                        rounded-full isidoraBold flex items-center justify-center ${
                            currentQuestion === index &&
                            "border-2 border-shinyPurple"
                        }`}
                    >
                        {index}
                    </button>
                );
            })}
        </div>
    );
};

export default QuestionsNav;
