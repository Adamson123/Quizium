import React, { useState } from "react";
import generateAvatar from "../../utils/generateAvatar";

const Leaderboard = ({
    participants,
    edit,
    style,
    showHeader = true,
    rowStyle,
    rowEdit,
    boardStyle,
    boardEdit,
    setResult = () => {},
    userId,
}) => {
    const descendingOrder = () => {
        return participants?.sort((a, b) => {
            return b.points - a.points;
        });
    };

    const [topThreecolors] = useState(["#ffd900dc", "#c0c0c0", "#cd7f32"]);
    return (
        <div style={style} className={`bg-transparentBlack rounded ${edit}`}>
            {showHeader && (
                <div
                    className="p-3 border-b border-grayOne
                     flex items-center gap-2"
                >
                    <span className="isidoraSemiBold">Leaderboard</span>
                    <span className="bi-trophy-fill text-grayFive"></span>
                </div>
            )}

            <div
                style={boardStyle}
                className={`flex flex-col p-2 pl-5 gap-3 ${boardEdit}`}
            >
                {descendingOrder() &&
                    descendingOrder()?.map((par, index) => {
                        return (
                            <div
                                onClick={() => setResult(par.userId)}
                                style={{
                                    ...rowStyle,
                                    background:
                                        userId === par.userId &&
                                        "rgb(249 115 2)",
                                }}
                                className={`flex items-center justify-between ${rowEdit}`}
                                key={index}
                            >
                                <span className="flex items-center gap-3">
                                    <span
                                        className="isidoraBold text-[19px] 
                                    font-bold mr-3"
                                    >
                                        {index < 3 ? (
                                            <span
                                                // -top-[13px]
                                                // -left-[12.5px]
                                                style={{
                                                    color: topThreecolors[
                                                        index
                                                    ],
                                                }}
                                                className="bi-star-fill text-[33px]
                                                relative mb-1"
                                            >
                                                <span
                                                    className="absolute text-[19px]
                                                     top-[20%] right-[37%] text-white flex"
                                                >
                                                    {" "}
                                                    {index + 1}
                                                </span>
                                            </span>
                                        ) : (
                                            <span> {index + 1}</span>
                                        )}
                                    </span>
                                    <span className="w-10 h-10">
                                        <img
                                            src={generateAvatar(par.avatar)}
                                            alt="participant image"
                                            className="h-full w-full rounded-full"
                                        />
                                    </span>
                                    <span className="text-[14px]">
                                        {par.nickname}
                                    </span>
                                </span>
                                {/* Points */}
                                <span className="text-[13px] isidoraBold">
                                    {par.points} Points
                                </span>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Leaderboard;
