import { useNavigate, useParams } from "react-router";
import PlayQuizPage from "./PlayQuizPage";
import { getHost, socket } from "../api/HostApi";
import { useQuery } from "react-query";
import { useEffect, useRef, useState } from "react";

import PageIsLoading from "../components/ui/PageIsLoading";
import toast from "react-hot-toast";
import { getUser } from "../api/UserApi";

const PlayLiveQuizPage = () => {
    const { data, refetch } = useQuery(["user"], getUser, { retry: false });
    const { id } = useParams();
    const navigate = useNavigate();
    const [hostInfo, setHostInfo] = useState();
    const connectedRef = useRef(false);
    useEffect(() => {
        if (connectedRef.current) {
            return;
        }
        socket.connect();
        socket.emit("get-host-info", id);

        socket.on("get-host-info-res", (info) => {
            /*we are not checking if quiz have ended here , 
                because I don't want to be redirected as soon as quiz was ended*/
            if (info.err) {
                return;
            }
            setHostInfo(info);
        });

        socket.emit("quiz-ended", id);
        socket.on("quiz-ended-res", (info) => {
            setHostInfo(info);
        });

        connectedRef.current = true;
    }, [socket]);
    //  const value = useContext(dataContext);

    const alreadySubmitted = () => {
        const submitted = hostInfo?.participantsResults?.find((res) => {
            return res.userId === data?._id;
        });
        return submitted;
    };

    console.log(hostInfo, "Host info");

    if (alreadySubmitted()) {
        toast.error("Already Submitted");
        return navigate("/");
    }

    if (hostInfo?.ended) {
        toast.error("Quiz was ended");
        return navigate("/");
    }
    if (hostInfo && !hostInfo?.started) {
        toast.error("Quiz has not started");
        return navigate("/");
    }

    console.log(hostInfo, "lopp");

    if (!hostInfo || !data) {
        return <PageIsLoading message={"Loading..."} />;
    }

    return (
        hostInfo && (
            <PlayQuizPage
                quizId={hostInfo.quizId}
                hostId={id}
                socket={socket}
                userId={data?._id}
            />
        )
    );
};

export default PlayLiveQuizPage;
