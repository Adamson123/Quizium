import { useNavigate, useParams } from "react-router";
import Header from "../components/HostLiveComps/Header";
import JoinCode from "../components/HostLiveComps/JoinCode";
import Participants from "../components/Participants";
import { useEffect, useRef, useState } from "react";
import { socket } from "../api/HostApi";
import toast from "react-hot-toast";
import Leaderboard from "../components/HostLiveComps/Leaderboard";
import { useQuery } from "react-query";
import { getUser } from "../api/UserApi";
import PageIsLoading from "../components/ui/PageIsLoading";
import ConfirmAction from "../components/ConfirmAction";

const HostLivePage = () => {
    const { data, refetch } = useQuery(["user"], getUser, { retry: false });
    const { id } = useParams();
    const connectedRef = useRef(false);
    const [hostInfo, setHostInfo] = useState();
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (connectedRef.current) {
            return;
        }
        socket.connect();
        socket.on("connect", () => {
            console.log("socket connection established");
        });
        //
        socket.emit("get-host-info", id);
        socket.on("get-host-info-res", (info) => {
            // if (info.err && !info.msg) {
            //     socket.disconnect();
            //     toast.error(info.err);
            //     history.replaceState(null, "", "/");
            //     return navigate("/host-report/" + id);
            // }
            if (info.ended) {
                socket.disconnect();
            }
            console.log(info, "info");
            setHostInfo(info);
        });

        connectedRef.current = true;
    }, [socket]);

    const endQuiz = () => {
        if (socket.disconnected) {
            setShowConfirm(false);
            return;
        }
        socket.emit("end-live", id);
        const toastId = toast.loading("Ending quiz");
        socket.on("get-host-info-res", (info) => {
            if (info.ended) {
                toast.success("Live quiz ended", { id: toastId });
                // socket.disconnect();
            }
        });
        setShowConfirm(false);
    };

    if (!data || !hostInfo) {
        return <PageIsLoading message={"Loading..."} />;
    }

    if (hostInfo?.hostedBy !== data?._id) {
        return navigate("/");
    }

    return (
        <div
            className="min-h-screen overflow-hidden
         md:max-h-screen flex flex-col items-center
          gap-3 justify-center p-3 pt-[61px]"
        >
            <Header
                socket={socket}
                id={id}
                navigate={navigate}
                setShowConfirm={setShowConfirm}
            />
            <div className="w-full flex flex-col gap-3 max-w-[550px]">
                <JoinCode hostInfo={hostInfo} socket={socket} />
                {!hostInfo?.started ? (
                    <Participants hostInfo={hostInfo} />
                ) : (
                    <Leaderboard participants={hostInfo?.participants} />
                )}
            </div>
            {hostInfo?.ended && (
                <button
                    onClick={() => {
                        history.replaceState(null, "", "/");
                        navigate("/host-report/" + id);
                    }}
                    className="isidoraBold py-2 text-[13px] px-5 
                        rounded insetShadow
                        bg-shinyPurple"
                >
                    View Report
                </button>
            )}
            <ConfirmAction
                executeAction={endQuiz}
                text={"Are you sure you want to end this quiz?"}
                setShowConfirm={setShowConfirm}
                showConfirm={showConfirm}
            />
        </div>
    );
};

export default HostLivePage;
