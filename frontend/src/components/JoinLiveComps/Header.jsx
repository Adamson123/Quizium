import { useState } from "react";
import ConfirmAction from "../ConfirmAction";
import SocketState from "../SocketState";

import { Link } from "react-router-dom";

const Header = ({
    showBtn = true,
    id,
    socket,
    userId,
    alreadyJoined = () => {},
    alreadySubmitted,
}) => {
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div
            className="fixed top-0 right-0 left-0 py-2 px-4 
            bg-transparentBlack
            flex items-center justify-between z-20"
        >
            <Link to={"/"}>
                <h1
                    className="font-bold text-2xl
             text-shinyPurple agbalumoFont tracking-tighter cursor-pointer"
                >
                    Quizium
                </h1>
            </Link>
            {alreadyJoined() && <SocketState socket={socket} />}
            {showBtn && alreadyJoined() && !alreadySubmitted() && (
                <button
                    onClick={() => setShowConfirm(true)}
                    className="bg-red-500 px-3 py-2 text-[12px] isidoraBold clickable
             insetShadow rounded"
                >
                    Leave room
                </button>
            )}
            <ConfirmAction
                executeAction={() => {
                    socket.emit("leave-room", { id, userId });
                    if (socket.disconnected) {
                        //navigate("/");
                    }
                }}
                setShowConfirm={setShowConfirm}
                showConfirm={showConfirm}
                text={"Are you sure you want to leave this room?"}
            />
        </div>
    );
};

export default Header;
