import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import generateAvatar from "../../utils/generateAvatar";
import { socket } from "../../api/HostApi";
import { useNavigate, useParams } from "react-router";
import LiveProfileSetup from "./LiveProfileSetup";
import Participants from "../Participants";
import toast from "react-hot-toast";
import HoverForInfo from "../HoverForInfo";
import { useQuery } from "react-query";
import { getUser } from "../../api/UserApi";
import PageIsLoading from "../ui/PageIsLoading";
const Room = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const { data: value, refetch } = useQuery(["user"], getUser, {
        retry: false,
    });
    const connectedRef = useRef(false);
    const [hostInfo, setHostInfo] = useState();
    const toastRef = useRef({
        ended: false,
        started: false,
    });
    // http://localhost:5173/host-live/66d27fa27c49f0e24dbbbdb5

    useEffect(() => {
        if (
            toastRef.current.started ||
            toastRef.current.ended ||
            connectedRef.current
        ) {
            return;
        }

        socket.connect();
        socket.on("connect", () => {
            console.log("socket connection established");
        });
        //
        socket.emit("get-host-info", id);
        socket.on("get-host-info-res", (info) => {
            //FIXME
            if (info.err && !toastRef.current.ended) {
                socket.disconnect();
                if (window.location.pathname === "/join-live/" + id) {
                    toast.error(info.err);
                    toastRef.current.ended = true;
                    socket.disconnect();
                    return navigate("/");
                }
            }

            setHostInfo(info);
        });
        connectedRef.current = true;
    }, [socket, hostInfo]);

    useEffect(() => {
        if (hostInfo?.triggerPlay && !toastRef.current.started) {
            toastRef.current.started = true;
            toast.success("Quiz has started");
            socket.disconnect();
            //we will be getting the quiz by host id in play-live page
            return navigate("/play-live/" + id);
        }
    }, [hostInfo]);

    //checks if user has alredy joined room
    const alreadyJoined = () => {
        const joined = hostInfo?.participants.find((par) => {
            return par.userId === value?._id;
        });
        return joined;
    };

    const alreadySubmitted = () => {
        const submitted = hostInfo?.participantsResults.find((res) => {
            return res.userId === value?._id;
        });

        return submitted;
    };

    const getQuizType = () => {
        const type =
            hostInfo?.applyTime === "entire"
                ? "Exam-Style Scoring"
                : "Speed-Based Scoring";

        const description =
            hostInfo?.applyTime === "entire"
                ? `Focus on accuracy with a single time limit for the whole quiz.
         No extra points for speed, so take your time and get it right.`
                : `Answer quickly to score more, Each question has a timer,
         and faster responses mean higher points. 
         Accuracy still matters, so think fast.`;

        return { type, description };
    };

    if (!value) {
        return <PageIsLoading />;
    }

    return (
        <div
            className="flex justify-center 
            items-center min-h-screen p-3 pt-16"
        >
            <Header
                id={id}
                socket={socket}
                userId={value?._id}
                alreadyJoined={alreadyJoined}
                alreadySubmitted={alreadySubmitted}
                navigate={navigate}
            />
            {hostInfo ? (
                !alreadyJoined() ? (
                    <LiveProfileSetup
                        generateAvatar={generateAvatar}
                        socket={socket}
                        userId={value?._id}
                    />
                ) : (
                    <div className="flex flex-col gap-3 w-full max-w-[550px]">
                        {!hostInfo?.started && (
                            <h2 className="text-center isidoraBold text-grayFive">
                                Waiting for host to start...
                            </h2>
                        )}
                        <div
                            className="w-full bg-transparentBlack p-3  
                        flex flex-col gap-3 isidoraBold 
                        items-center rounded text-[13px]"
                        >
                            <div className="justify-between flex w-full">
                                <span className="">Questions </span>
                                <span>{hostInfo?.questionsLength}</span>
                            </div>
                            <div className="justify-between flex w-full">
                                <span className="">Scoring</span>
                                <span className="flex gap-2">
                                    {getQuizType().type}{" "}
                                    <HoverForInfo
                                        edit={
                                            "left-[-180px] md:left-0 bg-[rgba(0,0,0,0.3)]"
                                        }
                                        parentEdit={"cursor-pointer"}
                                        text={
                                            <p>{getQuizType().description}</p>
                                        }
                                    />
                                </span>
                            </div>
                        </div>
                        {/* Your profile */}
                        <div className="flex gap-3 w-full">
                            <div className="w-28 h-20 bg-transparentBlack p-2 rounded">
                                <img
                                    className="h-full w-full"
                                    src={generateAvatar(alreadyJoined().avatar)}
                                />
                            </div>
                            <div
                                className="px-5 bg-transparentBlack w-full flex
                             items-center rounded"
                            >
                                <span className="isidoraBold">
                                    {alreadyJoined().nickname}
                                </span>
                            </div>
                        </div>
                        <Participants hostInfo={hostInfo} edit={"w-full"} />
                        {hostInfo?.started &&
                            (!alreadySubmitted() ? (
                                <button
                                    onClick={() => navigate("/play-live/" + id)}
                                    className="py-3 bg-shinyPurple insetShadow
                         clickable rounded isidoraBold text-[13px]"
                                >
                                    Start playing
                                </button>
                            ) : (
                                <p className="isidoraBold text-green-500 text-center">
                                    Already Submitted
                                </p>
                            ))}
                    </div>
                )
            ) : (
                <div className="flex flex-col gap-3 w-full items-center">
                    <div className="h-64 w-full max-w-[550px] skeleton rounded"></div>
                    <div className="h-24 w-full max-w-[550px] skeleton rounded"></div>
                    <div className="h-16 w-full max-w-[550px] skeleton rounded"></div>
                </div>
            )}
        </div>
    );
};

export default Room;
