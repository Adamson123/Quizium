import React from "react";
import shortenText from "../../utils/shortenText";

const QuestionAnswers = ({ quest }) => {
    if (quest.questionType === "quiz") {
        return quest.options.map((opt, index) => {
            return (
                opt.text.trim(" ") && (
                    <p
                        key={index}
                        className={`flex justify-between items-center px-2 
                             py-1 ${
                                 quest.answer.includes(opt._id)
                                     ? "bg-green-500"
                                     : "bg-red-500"
                             } rounded-[2px] insetShadow`}
                    >
                        <span>{shortenText(opt.text, 45)}</span>
                        <span
                            className={` ${
                                quest.answer.includes(opt._id)
                                    ? "bi-check"
                                    : "bi-x"
                            } text-[20px] font-bold`}
                        ></span>
                    </p>
                )
            );
        });
    } else if (quest.questionType === "trueFalse") {
        return (
            <>
                <p
                    className={`flex justify-between items-center px-2 
         py-1 ${
             quest.answer.includes("true") ? "bg-green-500" : "bg-red-500"
         } rounded-[2px] insetShadow`}
                >
                    <span>True</span>
                    <span
                        className={` ${
                            quest.answer.includes("true") ? "bi-check" : "bi-x"
                        } text-[20px] font-bold`}
                    ></span>
                </p>
                <p
                    className={`flex justify-between items-center px-2 
          py-1 ${
              quest.answer.includes("false") ? "bg-green-500" : "bg-red-500"
          } rounded-[2px] insetShadow`}
                >
                    <span>False</span>
                    <span
                        className={` ${
                            quest.answer.includes("false") ? "bi-check" : "bi-x"
                        } text-[20px] font-bold`}
                    ></span>
                </p>
            </>
        );
    } else {
        return quest.answer.map((ans, index) => {
            return (
                ans.trim(" ") && (
                    <p
                        key={index}
                        className={`flex justify-between items-center px-2 
                py-1 bg-green-500 rounded-[2px] insetShadow`}
                    >
                        <span>{shortenText(ans, 45)}</span>
                        <span
                            className={`bi-check text-[20px] font-bold`}
                        ></span>
                    </p>
                )
            );
        });
    }
};

export default QuestionAnswers;
