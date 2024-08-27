import { useEffect, useRef, useState } from "react";

const EachTime = ({
    singleQuestion,
    startQuiz,
    selectAnswer,
    findQuestionResult,
    allQuestionsResults,
    timeSpent,
    getTwentyPercentage,
}) => {
    const [countTime, setCountTime] = useState(100);

    useEffect(() => {
        //setting time spent from here because countTime is being updated only here
        if (!startQuiz || !singleQuestion.timeLimit || findQuestionResult()) {
            return;
        }

        //will return 20 if timeLimit is 5
        const substractBy = Math.round(100 / singleQuestion.timeLimit);
        const intervalId = setInterval(() => {
            if (countTime > 0) {
                const countingTime = countTime - substractBy;
                setCountTime(countingTime);
            }

            if (countTime === 0) {
                //we will automatically submit question answer(empty) here if time is up
                selectAnswer([]);
            }
        }, 1000);

        timeSpent.current = Math.round(countTime / substractBy);
        return () => {
            clearInterval(intervalId);
        };
    }, [countTime, startQuiz, singleQuestion, allQuestionsResults]);

    useEffect(() => {
        if (!findQuestionResult()) {
            setCountTime(100);
        } else {
            console.log(
                findQuestionResult().timeSpent,
                "spent",
                findQuestionResult()
            );

            const timeSpent_2 =
                findQuestionResult().timeSpent *
                /*will return the number gotten if 100 is divided by the limit
                example: will return 20 if question timeLimit is 5 */
                Math.round(100 / singleQuestion.timeLimit);

            setCountTime(timeSpent_2);
        }
    }, [singleQuestion]);

    getTwentyPercentage();
    return (
        <div>
            <div
                className={`radial-progress relative z-10 
                 isidoraBold ${
                     getTwentyPercentage(
                         singleQuestion.timeLimit,
                         Math.round(
                             countTime / (100 / singleQuestion?.timeLimit)
                         )
                     )
                         ? "text-red-500"
                         : "text-shinyPurple"
                 }`}
                role="progressbar"
                style={{
                    "--value": countTime,
                    "--thickness": "10px",
                    "--size": "5rem",
                }}
            >
                <div className="flex flex-col items-center">
                    <span className="text-3xl">
                        {/* if singleQuestion.timeLimit is 5, we will get 20 if we
                      divide 100 by 5, and we will divide countTime by 20 as it's updating with the interval*/}
                        {Math.round(
                            countTime / (100 / singleQuestion?.timeLimit)
                        ) || 0}
                    </span>
                </div>

                <div
                    className="border-[10px] absolute h-full w-full
                            rounded-full -z-10 border-[rgba(0,0,0,0.3)]"
                ></div>
            </div>
        </div>
    );
};

export default EachTime;