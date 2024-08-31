import { useParams } from "react-router";
import Header from "../components/HostLiveComps/Header";
import JoinCodeInput from "../components/HostLiveComps/JoinCodeInput";
import Participants from "../components/HostLiveComps/Participants";
import { useEffect, useRef, useState } from "react";
import { socket } from "../api/HostApi";

const HostLivePage = () => {
    const { id } = useParams();
    const connectedRef = useRef(false);
    const [hostInfo, setHostInfo] = useState({});
    // http://localhost:5173/host-live/66d27fa27c49f0e24dbbbdb5

    useEffect(() => {
        if (!connectedRef.current) {
            socket.connect();
            socket.on("connect", () => {
                console.log("socket connection established");
            });
            //
            socket.emit("get-host-info", id);
            connectedRef.current = true;
            // }
            socket.on("get-host-info-res", (info) => {
                console.log(info, "info");
                setHostInfo(info);
            });
        }
        // return () => {
        //     socket.disconnect();
        // };
    }, [socket]);

    return (
        <div
            className="min-h-screen overflow-hidden
         md:max-h-screen flex justify-center p-3 pt-[61px]"
        >
            <Header />
            <div className="w-full flex flex-col gap-3">
                <JoinCodeInput hostInfo={hostInfo} />
                <Participants hostInfo={hostInfo} />
            </div>
        </div>
    );
};

export default HostLivePage;
