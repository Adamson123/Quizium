import { memo, useState } from "react";
import BufferToObjUrl from "../../../utils/bufferToObjUrl";
import quiziumImg from "../../../assets/images/defaultCover/quizium-8.webp";
import newUser from "../../../assets/images/defaultProfile/newUser.png";

const QuizCard = memo(({ info }) => {
    //quiz cover image not provided? use default quiz cover image
    const [image, setImage] = useState(
        info.coverImg
            ? BufferToObjUrl(info.coverImg.image.data.data)
            : quiziumImg
    );

    //user profile image not provided? use default profile image
    const [profImg, setCreatedBy] = useState(
        info.createdBy.profileImg
            ? BufferToObjUrl(info.createdBy.profileImg.image.data.data)
            : newUser
    );
    console.log("quiz card rendered");
    return (
        <div
            className="outsetShadow box-border border-solid
border-gray-600 rounded h-[200px] min-w-[200px] cursor-pointer overflow-hidden"
        >
            {/* Quiz image */}
            <div className="w-full h-[100px] bg-white rounded-tl rounded-tr">
                <img
                    src={image}
                    alt="quiz cover profile image"
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Quiz info */}
            <div className="p-3 h-[100px] flex flex-col justify-between">
                <div className="flex items-center">
                    <span className="h-[25px] w-[25px] border rounded-full bg-black mr-1 overflow-hidden">
                        <img
                            src={profImg}
                            alt="quiz creator profile image"
                            loading="lazy"
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
});

export default QuizCard;
