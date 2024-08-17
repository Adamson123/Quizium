import { memo, useState } from "react";
import quizImg from "../../assets/images/defaultCover/quizium-4.webp";
import bufferToObjUrl from "../../utils/bufferToObjUrl";
import QuestionAnswers from "./QuestionAnswers";
import shortenText from "../../utils/shortenText";
const Questions = memo(({ questions }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    const returnQuestype = (type) => {
        if (type === "quiz") {
            return "Quiz";
        } else if (type === "typeAnswer") {
            return "Type Answer";
        } else {
            return "True or False";
        }
    };

    return (
        <div className="w-full px-2 flex flex-col gap-5 pb-5 md:max-w-[50%]">
            {/* Question header */}
            <div className="flex justify-between px-3">
                <h2 className="isidoraBold text-[20px]">Questions</h2>

                <div className="flex gap-2 items-center isidoraSemiBold ">
                    <label htmlFor="showAns" className="mb-[2px] text-[13px]">
                        Show answers
                    </label>
                    <input
                        onChange={() => setShowAnswer(!showAnswer)}
                        type="checkbox"
                        id="showAns"
                        className="checkbox w-5 h-5 optionsChecked
                        tickColor text-[3px] rounded"
                    />
                </div>
            </div>

            {/* Questions */}
            <div
                className="flex flex-col gap-4 py-3 px-3 h-full 
        md:max-h-screen md:overflow-y-auto overflow-x-hidden"
            >
                {questions?.map((quest, index) => {
                    return (
                        <div className="flex flex-col gap-2" key={index}>
                            <div
                                className="w-full min-h-[90px] max-h-[90px] shadowAround2 rounde
             overflow-hidden flex pl-3"
                            >
                                <div className="h-full w-full pr-2 max-w-[65%]">
                                    <span className="text-[15px] isidoraBold text-grayFive">
                                        {returnQuestype(quest.questionType)}
                                    </span>
                                    <p className="text-[12px] isidoraSemiBold mt-2 break-words">
                                        {shortenText(quest.question, 95)}
                                    </p>
                                </div>
                                {/* image */}
                                <div className="min-h-full w-[35%] overflow-hidden">
                                    <img
                                        src={
                                            !quest.image
                                                ? quizImg
                                                : bufferToObjUrl(
                                                      quest.image.image.data
                                                          .data
                                                  )
                                        }
                                        alt="question image"
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            {/* Answers */}
                            {showAnswer && (
                                <div
                                    className="flex flex-col gap-2 text-[13px]
                     border-b border-grayFive pb-2 isidoraSemiBold"
                                >
                                    {
                                        <QuestionAnswers
                                            quest={quest}
                                            shortenText={shortenText}
                                        />
                                    }
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default Questions;
