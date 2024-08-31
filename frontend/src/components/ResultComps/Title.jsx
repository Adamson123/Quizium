import { useState } from "react";
import Share from "../Share";

const Title = ({ data }) => {
    const [showShare, setShowShare] = useState({
        open: false,
        url: "",
    });

    return (
        <div
            className="px-3 py-3
     flex justify-between items-center"
        >
            <div>
                <h1 className="text-3xl isidoraBold">{data?.title}</h1>
                <span className="text-[13px] text-white isidoraBold">
                    Result
                </span>
            </div>
            <button
                onClick={() =>
                    setShowShare({
                        open: true,
                        url: window.location.origin + "/result/" + data?._id,
                    })
                }
                className="flex mb-4 pr-3 bg-grayOne py-1 pl-3
             rounded insetShadow clickable"
            >
                <span className="bi-share-fill"></span>
            </button>
            <Share showShare={showShare} setShowShare={setShowShare} />
        </div>
    );
};

export default Title;
