const TrueFalse = ({ findQuestionResult, selectAnswer, timeSpent }) => {
    const changeOptionColor = (text, optColor) => {
        //color for correct answer
        let color =
            findQuestionResult() &&
            findQuestionResult()?.answer.includes(text) &&
            "rgb(74,222,128)";

        /*color for incorrect answer, it will first check if findQuestionResult 
        returns a positive value, then check if the option text is inside the answers/answer
        defined in answer array then finally checks if the answer picked is correct
        (cause we only want to change the color of the option that is incorrect if the user
        got the answer wrong) */
        color =
            findQuestionResult() &&
            !findQuestionResult()?.answer.includes(text) &&
            !findQuestionResult().correct
                ? "rgb(239,68,68)"
                : color;

        return color ? color : optColor;
    };

    return (
        <div className="flex gap-4">
            {[
                { text: "true", color: "#2196F3" },
                { text: "false", color: "#FF9800" },
            ].map((opt, index) => {
                return (
                    <div
                        style={{
                            background: !findQuestionResult()
                                ? opt.color
                                : changeOptionColor(opt.text, opt.color),
                        }}
                        onClick={() => selectAnswer([opt.text])}
                        key={index}
                        className={`relative
                        rounded text-center 
                        p-2 px-10 w-full min-h-36 text-wrap break-words
                        flex items-center justify-center cursor-pointer
                        bg-[${opt.color}]
                        text-2xl insetShadow ${
                            "" /*changeOptionColor(opt.text)*/
                        }
                        ${
                            findQuestionResult() &&
                            !findQuestionResult().answer.includes(opt.text) &&
                            "opacity-[0.5]"
                        }
                      
                        `}
                    >
                        {opt.text[0].toUpperCase() +
                            opt.text.substring(1, opt.text.length)}
                    </div>
                );
            })}
        </div>
    );
};

export default TrueFalse;
