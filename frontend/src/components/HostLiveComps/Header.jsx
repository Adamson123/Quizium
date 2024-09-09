import SocketState from "../SocketState";
import { Link } from "react-router-dom";

const Header = ({ socket, id, navigate, setShowConfirm }) => {
    return (
        <div
            className="fixed top-0 right-0 left-0 py-2 px-4 
            bg-transparentBlack
            flex items-center justify-between"
        >
            <Link to={"/"}>
                <h1
                    className="font-bold text-2xl
             text-shinyPurple agbalumoFont tracking-tighter cursor-pointer"
                >
                    Quizium
                </h1>
            </Link>
            <SocketState socket={socket} />
            <button
                onClick={() => setShowConfirm(true)}
                className="bg-red-500 px-3 py-2 text-[12px] isidoraBold clickable
             insetShadow rounded"
            >
                End live
            </button>
        </div>
    );
};

export default Header;
