import { useState } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";

const LiveProfileSetup = ({ generateAvatar, socket, userId }) => {
    const { id } = useParams();
    const [avatars] = useState([
        "Coco",
        "Baby",
        "Chester",
        "Tigger",
        "Jasmine",
        "Oreo",
        "Daisy",
        "Jack",
        "Lucy",
        "Sadie",
    ]);
    const [currentAvatar, setCurrentAvatar] = useState("Coco");
    const [nickname, setNickname] = useState("");

    //join user to the room
    const joinRoom = async () => {
        if (!nickname.trim(" ")) {
            return toast.error("Input your nickname");
        }

        const toastId = toast.loading("Joing room");
        socket.emit("join-user", {
            nickname,
            avatar: currentAvatar,
            userId,
            id,
        });

        await socket.on("get-host-info-res", (info) => {
            console.log(info, "response");
        });
        toast.success("Successfully joined room", {
            id: toastId,
        });
    };

    return (
        <div className="flex flex-col gap-3 w-full max-w-[550px]">
            {/* Avatar */}
            <div
                className="bg-transparentBlack flex flex-col gap-3 
items-center p-5 rounded "
            >
                <h2 className="isidoraBold">Choose your avatar</h2>
                <div
                    className="flex flex-wrap
       w-full gap-5 rounded justify-center"
                >
                    {avatars.map((avatar, index) => {
                        return (
                            <div
                                onClick={() => setCurrentAvatar(avatar)}
                                className="h-[70px] w-[70px] 
                    cursor-pointer relative"
                                key={index}
                            >
                                <img
                                    style={{
                                        transition: "all 0.2s",
                                    }}
                                    src={generateAvatar(avatar)}
                                    alt={`avatar ${avatar}`}
                                    className={`w-full h-full rounded-full 
                        ${
                            currentAvatar === avatar &&
                            "border-2 border-shinyPurple p-1"
                        }`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Nick name */}
            <div className="flex flex-col gap-3">
                <div
                    className="flex flex-col gap-3 items-center
             bg-transparentBlack p-3 rounded"
                >
                    <h2 className="isidoraBold">Input your nickname</h2>
                    <input
                        onChange={(event) => setNickname(event.target.value)}
                        type="text"
                        className="bg-white px-3 py-2
         text-black isidoraBold rounded w-full"
                    />
                </div>
                <button
                    onClick={joinRoom}
                    className="bg-shinyPurple py-3  isidoraBold rounded
    w-full insetShadow clickable"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default LiveProfileSetup;
