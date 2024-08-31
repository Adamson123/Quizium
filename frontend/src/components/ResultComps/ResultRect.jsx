const ResultRect = ({ result }) => {
    const getOption = (id) => {
        const options = result.options.find((opt) => opt._id === id);

        return options;
    };

    const getQuizType = () => {
        if (result.questionType === "quiz") {
            return "Quiz";
        } else if (result.questionType === "typeAnswer") {
            return "Type Answer";
        } else {
            return "True or False";
        }
    };
    return (
        <div className="p-3 border border-grayOne rounded">
            <div className="flex justify-between mb-2">
                <span className="isidoraSemiBold text-grayFive">
                    {getQuizType()}
                </span>
                {result.correct ? (
                    <span
                        className="px-2 py-1 text-[10px] bg-green-600 p-1
         text-green-300 rounded border border-green-300 "
                    >
                        <span className="bi-check mt-2"></span>{" "}
                        <span>Correct</span>
                    </span>
                ) : (
                    <span
                        className="px-2 py-1 text-[10px] bg-red-600 p-1
         text-red-300 rounded border border-red-300 "
                    >
                        <span className="bi-x mt-2"></span>{" "}
                        <span>Incorrect</span>
                    </span>
                )}
            </div>
            {/* Question */}
            <h2 className="isidoraSemiBold mb-2">{result.question}</h2>

            {/* Response and answer*/}
            <div className="flex flex-col gap-3">
                {/* Response */}
                <div className="flex flex-col gap-2">
                    <span className="text-[12px] text-grayFive">
                        Your Answer
                    </span>

                    <div className="flex flex-col gap-2">
                        {/* User answers */}
                        {result.userAnswer.map((ans, index) => {
                            return (
                                <span
                                    className={`flex items-center gap-3
                                         ${
                                             result.answer.includes(ans)
                                                 ? "bg-green-500"
                                                 : "bg-red-500"
                                         } p-2 rounded border-2`}
                                >
                                    <span
                                        className={`  ${
                                            result.answer.includes(ans)
                                                ? "bi-check"
                                                : "bi-x"
                                        } text-[15px] mt-[2px] font-bold`}
                                    ></span>
                                    <span>
                                        {result.questionType === "quiz"
                                            ? getOption(ans)?.text
                                            : ans}
                                    </span>
                                </span>
                            );
                        })}
                    </div>
                </div>
                {/* Correct Answer */}
                <div className="flex flex-col gap-2">
                    <span className="text-[12px] text-green-500">
                        {" "}
                        Correct answer
                    </span>
                    <div className="flex flex-col gap-2">
                        {result.answer.map((ans, index) => {
                            return (
                                <span
                                    className="flex items-center 
                                bg-green-500 py-[10px] p-2 rounded"
                                >
                                    <span>
                                        {result.questionType === "quiz"
                                            ? getOption(ans)?.text
                                            : ans}
                                    </span>
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultRect;
