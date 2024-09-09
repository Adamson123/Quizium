import { useState } from "react";

const HoverForInfo = ({ edit, parentEdit, text, icon = "bi-question" }) => {
    const [showInfo, setShowInfo] = useState(false);
    return (
        <div
            onMouseOver={() => setShowInfo(true)}
            onMouseOut={() => setShowInfo(false)}
            className="relative"
        >
            <span
                className={`skeleton py-[1px] px-[2px] 
             bg-[rgba(0,0,0,0.6)] rounded-full text-[10px] ${icon} ${parentEdit}`}
            ></span>
            <div
                style={{
                    transition: "opacity 1s",
                }}
                className={`absolute z-10 w-[200px] bg-[rgba(0,0,0,0.9)] 
             p-3 rounded text-[11px] ${
                 showInfo ? "opacity-1" : "opacity-0 pointer-events-none"
             } ${edit}`}
            >
                {text}
            </div>
        </div>
    );
};

export default HoverForInfo;
