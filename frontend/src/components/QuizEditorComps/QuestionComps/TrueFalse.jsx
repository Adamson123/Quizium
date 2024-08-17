const TrueFalse = ({ updateAnswer, singleQuestion }) => {
    return (
        <div className="flex gap-4">
            <div
                className="relative
                  rounded text-center 
                  p-2 px-10 w-full min-h-36 text-wrap break-words
                  flex items-center justify-center cursor-pointer clickable
                  bg-[#2196F3] text-2xl insetShadow"
            >
                <input
                    onChange={updateAnswer}
                    type="radio"
                    checked={singleQuestion.answer.includes("true")}
                    className="absolute left-3 
                    checked:bg-[#2196F3] w-7 h-7 radio top-3 border-2"
                    name="option"
                    value="true"
                />
                True
            </div>
            <div
                className="relative
                  rounded text-cente
                  p-2 px-10 w-full min-h-36 text-wrap break-words
                  flex items-center justify-center cursor-pointer 
                  clickable bg-[#FF9800]  text-2xl  insetShadow"
            >
                <input
                    onChange={updateAnswer}
                    type="radio"
                    checked={singleQuestion.answer.includes("false")}
                    className="absolute left-3 
                    checked:bg-[#FF9800]  w-7 h-7 radio top-3 border-2"
                    name="option"
                    value="false"
                />
                False
            </div>
        </div>
    );
};

export default TrueFalse;
