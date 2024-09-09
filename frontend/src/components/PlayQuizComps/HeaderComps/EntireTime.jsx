import React, { useEffect, useReducer, useRef, useState } from "react";

const EntireTime = ({
    timeLimit,
    startQuiz,
    setStartQuiz,
    timeSpent,
    submitQuiz,
    setTimeUp,
    getTwentyPercentage,
    allQuestions,
    allQuestionsResults,
    hostId,
}) => {
    const getFromStorage = () => {
        const lsTime = sessionStorage.getItem(`remainingTime-${hostId}`);
        const storedTime = hostId && lsTime ? Number(lsTime) : timeLimit;

        return storedTime;
    };

    const [countTime, setCountTime] = useState(getFromStorage());
    const setCountTimeRef = useRef(true);

    useEffect(() => {
        if (setCountTimeRef.current === true && timeLimit) {
            setCountTime(getFromStorage());
            setCountTimeRef.current = false;
        }
        //setting time spent from here because countTime is being updated only here
        if (
            !startQuiz ||
            !timeLimit
            // ||allQuestionsResults.length === allQuestions.length
        ) {
            // setTimeSpent(timeLimit - countTime);
            return;
        }

        const intervalId = setInterval(() => {
            if (countTime > 0) {
                const countingTime = countTime - 1;
                timeSpent.current = countingTime;
                setCountTime(countingTime);

                if (hostId) {
                    sessionStorage.setItem(
                        `remainingTime-${hostId}`,
                        countingTime
                    );
                }
            }

            if (countTime <= 0) {
                setTimeUp(true);
                //submitQuiz();
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [timeLimit, countTime, startQuiz]);
    return (
        <div
            className="w-full flex items-center justify-center relative
         md:max-w-[550px]  smd:max-w-[580px] "
        >
            <progress
                className={`progress progress-primary
                ${
                    getTwentyPercentage(timeLimit, countTime)
                        ? "progressBarRed"
                        : "progressBar"
                } w-full h-5 p-[2px]
                 lg:max-w-[570px]`}
                value={countTime}
                max={timeLimit ? timeLimit : 0}
            ></progress>
            <span className="bi-stopwatch text-[10px] absolute right-1"></span>
        </div>
    );
};

export default EntireTime;
