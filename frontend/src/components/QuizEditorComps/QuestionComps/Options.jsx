import React, { useEffect, useRef, useState } from "react";
import Warning from "../../ui/Warning";
import toast from "react-hot-toast";

const Options = ({
    updateAnswer,
    singleQuestion,
    setAllQuestions,
    currentQuestion,
    allQuestions,
    allQuestions_2,
}) => {
    const [optionsTextColor] = useState([
        "#e779c1",
        "#408fb9",
        "#e8bf05",
        "#e48775",
    ]);

    const optionRefs = useRef([]);

    useEffect(() => {
        //if (allQuestions_2 === allQuestions) {
        // Add text to options
        allQuestions[currentQuestion]?.options.forEach((option, i) => {
            optionRefs.current[i].innerText = option.text;
        });
        //}
    }, [currentQuestion, allQuestions_2]);

    const updateOptions = (event, id) => {
        //update ONLY option THAT Mathes the passed down id

        const updatedOption = singleQuestion.options.map((option) => {
            return option._id !== id
                ? option
                : { ...option, text: event.target.innerText };
        });

        /*filtery out answers that does not match the id passed down,
         trying to get answer from only options that are not empty,by filtering
         out the id of this option if it's possibly emptied when typing */
        const answer = singleQuestion.answer.filter((ans, i) => {
            return ans !== id;
        });

        const updatedSingleQuestion = {
            ...singleQuestion,
            options: updatedOption,
            answer:
                event.target.innerText.trim(" ") === ""
                    ? answer
                    : singleQuestion.answer,
        };

        const updatedMultipleQuestion = allQuestions.map((q, i) => {
            return i !== currentQuestion ? q : updatedSingleQuestion;
        });

        setAllQuestions(updatedMultipleQuestion);
    };

    const checkEmptyOptionField = () => {
        const updateEmptyOptions = singleQuestion.options.filter((i) => {
            return i.text.trim(" ") === "";
        });

        return updateEmptyOptions.length;
    };

    return singleQuestion.options?.map((option, i) => {
        {
            return (
                <div
                    style={{
                        color: optionsTextColor[i],
                    }}
                    key={i}
                    className={`relative bg-mainBg
                        rounded text-center text-white
                        text-[15px] p-2 px-10 w-full min-h-12 text-wrap
                        break-words
                        flex items-center justify-center isidoraBold
                        shadowAround`}
                >
                    <input
                        onChange={(event) => {
                            optionRefs.current[i]?.innerText.trim(" ")
                                ? updateAnswer(event)
                                : toast.error("Option is empty");
                        }}
                        style={{
                            borderColor: optionsTextColor[i],
                        }}
                        value={option._id}
                        checked={singleQuestion.answer.includes(option._id)}
                        type={
                            singleQuestion.answerOption === "singleAnswer"
                                ? "radio"
                                : "checkbox"
                        }
                        className={`absolute left-3 bg-secMainBg ${
                            singleQuestion.answerOption === "singleAnswer"
                                ? `radio optionChecked${i}`
                                : `checkbox optionChecked${i} tickColor`
                        } w-5 h-5 ${i} `}
                        name="option"
                    />

                    <div
                        onInput={(event) => updateOptions(event, option._id)}
                        className={`w-full outline-none overflow-y-auto 
                         max-h-full`}
                        contentEditable
                        data-placeholder="Enter option..."
                        ref={(el) => (optionRefs.current[i] = el)}
                    />
                    {
                        // show warning only if all the option fields is empty
                        // and the particular option too is empty

                        checkEmptyOptionField() > 2 &&
                            // !option.text.trim(" ")
                            !option.text.trim(" ") && (
                                <Warning
                                    text={"Fill atleast two option field"}
                                />
                            )
                    }
                </div>
            );
        }
    });
};

export default Options;
