import { useEffect, useState } from "react";
import LoadingTitleAndGenerlInfo from "./LoadingTitleAndGenerlInfo";

const TitleAndGeneralInfo = ({ hostInfo }) => {
    const getCompletionRate = () => {
        const results = hostInfo?.participantsResults.map((res) => {
            return res.result.results;
        });

        const amountIfCompleted =
            hostInfo?.participantsResults.length * hostInfo?.questionsLength;
        //
        const amountAnswered = results?.reduce((acc, res) => {
            return acc + res?.length;
        }, 0);

        const percentage = Math.round(
            (amountAnswered * 100) / amountIfCompleted
        );
        return percentage && percentage !== Infinity ? percentage : 0;
    };

    const [generalInfo, setGeneralInfo] = useState([
        {
            name: "Completion rate",
            value: getCompletionRate() + "%",
            icon: "bi-check-all",
        },
        {
            name: "Total participants",
            value: hostInfo?.participants.length,
            icon: "bi-people",
        },
        {
            name: "Questions",
            value: hostInfo?.questionsLength,
            icon: "bi-patch-question",
        },
    ]);

    useEffect(() => {
        setGeneralInfo([
            {
                name: "Completion rate",
                value: getCompletionRate() + "%",
                icon: "bi-check-all",
            },
            {
                name: "Total participants",
                value: hostInfo?.participants.length,
                icon: "bi-people",
            },
            {
                name: "Questions",
                value: hostInfo?.questionsLength,
                icon: "bi-patch-question",
            },
        ]);
    }, [hostInfo]);

    return (
        <div>
            {/* Title */}
            <div
                className="w-full bg-mainBg p-2 
            rounded flex flex-col gap-5 shadowAround"
            >
                {/* Title */}
                <div className="flex flex-col">
                    <span className="text-[13px] text-grayFive isidoraBold">
                        Host report for
                    </span>
                    <h1 className="text-3xl isidoraBold">{hostInfo?.title}</h1>
                </div>
                {/* Completion rate, Total students, Questions*/}
                <div className="flex flex-wrap gap-2 max-h-[148px]">
                    {false ? (
                        generalInfo.map((info, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex items-center p-3 border
                                border-grayFive gap-2 rounded flex-1"
                                >
                                    {/* icon */}
                                    <div
                                        className="w-10 h-10 bg-grayFive flex
                                  items-center justify-center rounded shadowAround"
                                    >
                                        <span
                                            className={`${info.icon} text-[18px]`}
                                        ></span>
                                    </div>
                                    {/* Completion rate text */}
                                    <div className="flex flex-col">
                                        <span className="text-[12px] text-nowrap text-grayFive">
                                            {info.name}
                                        </span>
                                        <span className="isidoraBold text-[13px] text-nowrap">
                                            {info.value}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <LoadingTitleAndGenerlInfo />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TitleAndGeneralInfo;
