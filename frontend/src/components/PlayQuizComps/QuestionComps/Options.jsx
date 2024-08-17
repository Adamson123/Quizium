import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
const Options = ({
    options,
    allQuizResults,
    setAllQuizResults,
    singleQuestion,
    currentQuestion,
}) => {
    const [optionsBg] = useState(["#e779c1", "#408fb9", "#e8bf05", "#e48775"]);

    const selectedAnAnswer = useRef(false);

    const selectSingleAnswer = (id) => {
        if (!findQuestionResult()) {
            const { question, answer, questionType, answerType, options, _id } =
                singleQuestion;

            setAllQuizResults([
                ...allQuizResults,
                {
                    question,
                    answer,
                    questionType,
                    answerType,
                    options,
                    userAnswer: [id],
                    correct: id === answer[0],
                    _id,
                },
            ]);
        }
        selectedAnAnswer.current = true;
        console.log(allQuizResults);
    };

    const findQuestionResult = () => {
        const questId = singleQuestion._id;

        const questionResult = allQuizResults.find(
            (quest) => quest._id === questId
        );
        return questionResult;
    };

    const changeOptionColor = (id) => {
        //will change all wrong to red
        const allToWrongToRed = () => {
            return findQuestionResult().answer.includes(id)
                ? "#27ae60"
                : "#c0392b";
        };
        //will change choosen option to orange , else lives it as it's coming from color
        const changeSelectdToOrg = () => {
            return !findQuestionResult().correct &&
                findQuestionResult().userAnswer.includes(id)
                ? "#e67e22"
                : color;
        };

        let color = findQuestionResult() ? allToWrongToRed() : "";
        color = findQuestionResult() ? changeSelectdToOrg() : color;
        return color;
    };

    useEffect(() => {
        if (findQuestionResult() && selectedAnAnswer.current) {
            findQuestionResult().correct
                ? toast.success("Correct!!!🎉✔")
                : toast.error("Incorrect😢❌");
            selectedAnAnswer.current = false;
        }
    }, [allQuizResults]);

    return (
        <div className="flex flex-col gap-3 w-full">
            {options?.map((opt, index) => {
                return (
                    opt.text.trim(" ") && (
                        <div
                            onClick={() => selectSingleAnswer(opt._id)}
                            key={index}
                            style={{
                                background: changeOptionColor(opt._id)
                                    ? changeOptionColor(opt._id)
                                    : optionsBg[index],
                                transition: "transform 0.3s ease-in-out",
                            }}
                            className={`relative bg-mainBg
                            rounded text-center text-secMainBg
                            text-[15px] p-2 px-10 w-full min-h-12 text-wrap
                            break-words
                            flex items-center justify-center isidoraBold
                            insetShadow 
                            clickable cursor-pointer
                          
                            `}
                        >
                            {opt.text}
                            {findQuestionResult() && (
                                <span
                                    className={` ${
                                        findQuestionResult().answer.includes(
                                            opt._id
                                        )
                                            ? "bi-check"
                                            : "bi-x"
                                    } absolute left-3 text-[25px] font-bold`}
                                ></span>
                            )}
                        </div>
                    )
                );
            })}
        </div>
    );
};

export default Options;
