import { useState } from "react";
import BufferToObjUrl from "../../../utils/BufferToObjUrl";

const QuizCard = ({ info }) => {
    const [image, setImage] = useState(
        BufferToObjUrl(info.coverImg.image.data.data)
    );
    const [profImg, setCreatedBy] = useState(
        BufferToObjUrl(info.createdBy.profileImg.image.data.data)
    );
    return (
        <div
            className="border box-border border-solid
border-gray-600 rounded h-[200px] min-w-[170px] cursor-pointer"
        >
            {/* Quiz image */}
            <div className="w-full h-[100px] bg-white rounded-tl rounded-tr">
                <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Quiz info */}
            <div className="p-3 h-[100px] flex flex-col justify-between">
                <div className="flex items-center">
                    <span className="h-[25px] w-[25px] border rounded-full bg-black mr-1 overflow-hidden">
                        <img
                            src={profImg}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </span>
                    <span className="text-[12px]">{info.createdBy.name}</span>
                </div>
                {/* Quiz name */}
                <h3 className="font-bold text-[14px]">{info.title}</h3>
                <div className="flex justify-between text-[10px] text-gray-400">
                    <span>4 questions</span>
                    <span>12 plays</span>
                </div>
            </div>
        </div>
    );
};

export default QuizCard;
