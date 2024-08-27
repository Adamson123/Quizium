const TrueFalse = ({ updateAnswer, singleQuestion }) => {
    return (
        <div className="flex gap-4">
            {[
                { text: "true", color: "#2196F3" },
                { text: "false", color: "#FF9800" },
            ].map((opt, index) => {
                return (
                    <div
                        style={{
                            background: opt.color,
                        }}
                        key={index}
                        className={`relative
                        rounded text-center 
                        p-2 px-10 w-full min-h-36 text-wrap break-words
                        flex items-center justify-center cursor-pointer
                        text-2xl insetShadow`}
                    >
                        <input
                            onChange={updateAnswer}
                            type="radio"
                            checked={singleQuestion.answer.includes(opt.text)}
                            className={`absolute left-3 
                            checked:bg-[${opt.color}] w-7 h-7 radio top-3 border-2`}
                            name="option"
                            value={opt.text}
                        />
                        {opt.text[0].toUpperCase() +
                            opt.text.substring(1, opt.text.length)}
                    </div>
                );
            })}
        </div>
    );
};

export default TrueFalse;
