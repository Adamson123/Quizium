import { useState } from "react";
import Header from "./Header";
import userImg from "../../assets/images/defaultProfile/newUser.png";

const Room = () => {
    const [avatars] = useState([
        "elephant",
        "lion",
        "tiger",
        "cat",
        "dog",
        "lion",
    ]);
    return (
        <div className="flex justify-center items-center min-h-screen p-3 pt-16">
            <Header />
            <div className="flex flex-col gap-3">
                {/* Avatar */}
                <div
                    className="bg-transparentBlack flex flex-col gap-3 
                items-center py-7 rounded px-5"
                >
                    <h2 className="isidoraBold">Choose your avatar</h2>
                    <div
                        className="flex flex-wrap
                       w-full max-w-[285px] gap-5 rounded justify-center"
                    >
                        {avatars.map((avatar, index) => {
                            return (
                                <div className="h-[70px] w-[70px] cursor-pointer">
                                    <img
                                        src={userImg}
                                        alt={`avatar ${avatar}`}
                                        key={index}
                                        className="-w-full h-full rounded-full"
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
                            type="text"
                            className="bg-white px-3 py-2
                         text-black isidoraBold rounded w-full"
                        />
                    </div>
                    <button
                        className="bg-shinyPurple py-3  isidoraBold rounded
                    w-full insetShadow clickable"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Room;
