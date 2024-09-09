import { useRef } from "react";
import toast from "react-hot-toast";

const JoinCode = ({ hostInfo, socket }) => {
    const joinCodeRef = useRef();

    return (
        <div className="bg-transparentBlack p-3 rounded">
            <div className="flex flex-col gap-2 items-start">
                {/* join code */}
                <span className="flex justify-between">
                    <span className="text-[14px]">Join code</span>
                </span>
                {/* Code */}
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-[40px] isidoraBold" ref={joinCodeRef}>
                        {hostInfo?.joinCode}
                    </h2>
                    <button
                        onClick={() => {
                            const selection = window.getSelection();
                            const range = document.createRange();
                            range.selectNodeContents(joinCodeRef.current);
                            selection.removeAllRanges();
                            selection.addRange(range);
                            document.execCommand("copy");
                            selection.removeRange(range);
                            // navigator.clipboard.writeText(hostInfo?.joinCode);
                        }}
                        className="bi-copy text-[18px] h-9 w-8 rounded 
                        focus:bg-grayFive focus:text-transparentBlack font-bold"
                    ></button>
                </div>
                {/* Start Now */}
                {!hostInfo?.started && (
                    <button
                        onClick={() => {
                            if (!hostInfo?.participants.length) {
                                return toast.error(
                                    "You need atleast one participant"
                                );
                            }
                            socket.emit("start-quiz", hostInfo._id);
                        }}
                        className="py-[8px] px-5 rounded bg-shinyPurple
                 text-[12px] isidoraBold insetShadow clickable "
                    >
                        Start Quiz
                    </button>
                )}
            </div>
        </div>
    );
};

export default JoinCode;
