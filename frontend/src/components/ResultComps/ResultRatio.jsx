import { useEffect, useRef, useState } from "react";

const ResultRatio = ({ data, getAllCorAndInCor }) => {
    const getPercentage = () => {
        const questionsLength = data?.questionsLength;
        const correct = getAllCorAndInCor(true);
        // const inCorrect = getAllCorAndInCor(false);  🤷‍♂️
        const percentage = (correct * 100) / questionsLength; // or 100 - (inCorrect / questionsLength) * 100)
        return Math.round(percentage);
    };

    const generateReview = () => {
        const reviews = [
            {
                color: "#ff4d4f",
                darkColor: "#a8071a",
                remark: "Poor",
                message: "Need serious improvement.",
                lowest: 0,
                highest: 19,
            },
            {
                color: "#ff7a45",
                darkColor: "#ad4e00",
                remark: "Below Average",
                message: "Keep practicing.",
                lowest: 20,
                highest: 39,
            },
            {
                color: "#ffa940",
                darkColor: "#ad6800",
                remark: "Average",
                message: "You're getting there!.",
                lowest: 40,
                highest: 59,
            },
            {
                color: "#ffc53d",
                darkColor: "#ad8b00",
                remark: "Good",
                message: "Nice work! Keep it up.",
                lowest: 60,
                highest: 79,
            },
            {
                color: "#73d13d",
                darkColor: "#389e0d",
                remark: "Very Good!",
                message: "Almost perfect!.",
                lowest: 80,
                highest: 89,
            },
            {
                color: "#52c41a",
                darkColor: "#237804",
                remark: "Excellent!",
                message: "Outstanding performance!.",
                lowest: 90,
                highest: 100,
            },
        ];

        const pickReview = reviews.find((rev) => {
            if (
                getPercentage() >= rev.lowest &&
                getPercentage() <= rev.highest
            ) {
                return rev;
            }
        });

        return pickReview;
    };

    return (
        <div className="p-2">
            {/* Radial and percentage */}
            <div
                style={{
                    background: generateReview()?.color,
                }}
                className={`flex py-5 px-3 items-center gap-7
                justify-start w-full
                rounded shadow-inner`}
            >
                {/* Radial Score */}
                <div>
                    <div
                        className={`radial-progress relative z-10 
                        isidoraBold`}
                        role="progressbar"
                        style={{
                            "--value": getPercentage(),
                            "--thickness": "10px",
                            "--size": "8.5rem",
                            color: generateReview()?.darkColor,
                        }}
                    >
                        <div className="flex flex-col items-center relative pb-5">
                            <span className="text-3xl">{getPercentage()}%</span>
                            <span className="text-3xl text-[15px] absolute top-[26px]">
                                correct
                            </span>
                        </div>

                        <div
                            className="border-[10px] absolute h-full w-full
                            rounded-full -z-10 border-[rgba(0,0,0,0.2)]"
                        ></div>
                    </div>
                </div>
                {/* Text Score */}
                <div
                    className="text-black flex flex-col items-start 
        gap-2"
                >
                    <h3 className="text-3xl isidoraBold">
                        {generateReview()?.remark}
                    </h3>
                    <p
                        style={{
                            color: generateReview()?.darkColor,
                        }}
                        className="text-[12px] w-50 isidoraBold break-words"
                    >
                        {generateReview()?.message}
                    </p>
                    <button
                        className="bg-shinyPurple text-white text-[12px] isidoraBold
            py-2 px-3 rounded insetShadow clickable"
                    >
                        Play again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultRatio;
