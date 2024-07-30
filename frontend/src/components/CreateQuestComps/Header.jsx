import React from "react";
import { useNavigate } from "react-router";

const Header = ({ setShow, setShowRightSect }) => {
    const navigate = useNavigate();
    return (
        <div
            className="p-3 bg-mainBg flex justify-between fixed right-0 left-0 
         top-0 z-20 topNavShadow"
        >
            <h1
                onClick={() => {
                    navigate("/");
                }}
                className="font-bold text-2xl
          text-shinyPurple agbalumoFont tracking-tighter cursor-pointer"
            >
                Quizium
            </h1>
            {/* quiz settings , save button , change question type*/}
            <div className="flex items-center gap-3">
                {/* quiz settings*/}
                <div
                    onClick={() => setShow((s) => (s = true))}
                    className="border border-grayOne p-[3px] pl-2 rounded 
          flex items-center gap-2 cursor-pointer"
                >
                    <span className="isidoraBold text-[13px]">
                        Quiz settings
                    </span>
                    <button className="bg-grayTwo py-1 px-2 rounded">
                        <span className="bi-gear-fill"></span>
                    </button>
                </div>
                {/* question type */}
                <button
                    onClick={() => setShowRightSect((s) => (s = !s))}
                    className="p-[7px] slg:hidden clickable font-bold px-4 relative isidoraBold bg-shinyPurple insetShadow rounded"
                >
                    <span className="bi-chat text-1xl"></span>
                    <span className="bi-question absolute left-[16px]"></span>
                </button>
                {/* save button*/}
                <button className="p-[7px] clickable isidoraBold bg-shinyPurple insetShadow rounded">
                    Save
                </button>
            </div>
        </div>
    );
};

export default Header;
