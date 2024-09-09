import { useMutation } from "react-query";
import Header from "../JoinLiveComps/Header";
import { getHost } from "../../api/HostApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Join = () => {
    const navigate = useNavigate();
    const [joinCode, setJoinCode] = useState(0);
    const { mutateAsync: getHostFunc } = useMutation(getHost);

    const handleGetHost = async () => {
        if (joinCode < 1000000) {
            return toast.error("Invalid join code");
        }
        const promise = getHostFunc({ joinCode, id: "" });
        toast.promise(promise, {
            loading: "Finding room",
            success: (data) => {
                return data.msg;
            },
            error: (data) => {
                return data.err;
            },
        });

        const res = await promise;

        // if (res.hostInfo.ended) {
        //     return // toast.error("Live quiz has ended");
        // }

        navigate("/join-live/" + res.hostInfo._id);
    };
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Header showBtn={false} navigate={navigate} />
            <div
                className="p-6 rounded bg-transparentBlack flex
         flex-col gap-2 items-center w-[300px]"
            >
                <h2 className="isidoraBold">Input join code</h2>
                <input
                    onChange={(event) =>
                        setJoinCode(Number(event.target.value))
                    }
                    type="number"
                    className="bg-white px-3 py-2
             text-black isidoraBold rounded w-full"
                />
                <button
                    onClick={handleGetHost}
                    className="bg-shinyPurple py-3  isidoraBold rounded
               w-full insetShadow clickable"
                >
                    Find Room
                </button>
            </div>
        </div>
    );
};

export default Join;
