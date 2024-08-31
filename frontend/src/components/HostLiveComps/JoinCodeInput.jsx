import { useEffect, useRef, useState } from "react";

const JoinCodeInput = ({ hostInfo }) => {
    return (
        <div className="bg-transparentBlack p-3 rounded">
            <div className="flex flex-col gap-2 items-start">
                {/* join code */}
                <span className="flex justify-between">
                    <span className="text-[14px]">Join code</span>
                </span>
                {/* Code */}
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-[40px] isidoraBold">
                        {hostInfo.joinCode}
                    </h2>
                    <button className="bi-copy text-[18px]"></button>
                </div>
                {/* Start Now */}
                <button
                    className="py-[7px] px-5 rounded bg-shinyPurple
                 text-[12px] isidoraBold insetShadow clickable "
                >
                    Start Quiz
                </button>
            </div>
        </div>
    );
};

export default JoinCodeInput;
