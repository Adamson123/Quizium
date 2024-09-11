import { forwardRef, memo, useState } from "react";
import bufferToObjUrl from "../../../utils/cufferToObjUrl";
import quiziumImg from "../../../assets/images/defaultCover/quizium-8.webp";
import newUser from "../../../assets/images/defaultProfile/newUser.png";
import { useNavigate } from "react-router";
import shortenText from "../../../utils/shortenText";

const QuizCard = forwardRef(({ info, index }, ref) => {
    //quiz cover image not provided? use default quiz cover image
    const [image, setImage] = useState(
        info.coverImg
            ? bufferToObjUrl(info.coverImg.image.data.data)
            : quiziumImg
    );

    //user profile image not provided? use default profile image
    const [profImg, setCreatedBy] = useState(
        info.createdBy.profileImg
            ? bufferToObjUrl(info.createdBy.profileImg.image.data.data)
            : newUser
    );
    const navigate = useNavigate();

    console.log("quiz card rendered");
    return (
        <div
            ref={ref}
            onClick={() => navigate(`/details/${info._id}`)}
            className="outsetShadow box-border border-solid
            border-gray-600 rounded h-[220px] min-w-[200px] 
            cursor-pointer overflow-hidden quizCard"
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
            <div className="p-3 h-[120px] flex flex-col border-t border-grayOne relative">
                <div className="flex items-center -mt-5">
                    <span
                        className="h-[35px] w-[35px] border rounded-full
                         bg-black mr-1 overflow-hidden border-grayOne"
                    >
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
                <h3 className="font-bold text-[15px] isidoraSemiBold mt-1">
                    {shortenText(info.title, 18)}
                </h3>
                <div className="flex flex-col text-[10px] text-gray-400">
                    <span className="text-grayFive w-full text-[11.5px] isidoraSemiBold">
                        <span className="bi-patch-question-fill"></span>{" "}
                        {info?.questionsLength} questions
                    </span>
                    <span
                        className="text-grayFive 
                    text-right isidoraSemiBold absolute right-2 bottom-2"
                    >
                        <span className="bi-play-fill"></span>
                        {info?.numOfPlays?.length} plays
                    </span>
                </div>
            </div>
        </div>
    );
});

export default memo(QuizCard);
