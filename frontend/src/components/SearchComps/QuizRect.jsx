import { useNavigate } from "react-router";
import image from "../../assets/images/defaultCover/quizium-8.webp";
import bufferToObjUrl from "../../utils/cufferToObjUrl";
import shortenText from "../../utils/shortenText";
const QuizRect = ({ quiz }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate("/details/" + quiz._id)}
            className="p-2 bg-mainBg flex rounded 
        items-center gap-2 w-full cursor-pointer"
        >
            {/* image */}
            <div className="h-16 w-16 rounded overflow-hidden">
                <img
                    src={
                        bufferToObjUrl(quiz.coverImg?.image.data.data) || image
                    }
                    className="h-full w-full object-cover"
                />
            </div>
            {/* Info */}
            <div className="flex gap-[1px] flex-col">
                {/* Title */}
                {
                    /* Title for small screen */
                    <span className="slg:hidden isidoraBold">
                        {shortenText(quiz.title, 35)}
                    </span>
                }
                {
                    /* Title for big screen */
                    <span className="hidden slg:block isidoraBold">
                        {quiz.title}
                    </span>
                }
                {/* Question length */}
                <span
                    className="bi-patch-question-fill 
                 text-grayFive text-[10px]"
                >
                    {" "}
                    {quiz.questionsLength} Questions
                </span>
                <span className="bi-play-fill text-[10px] text-grayFive">
                    {quiz.numOfPlays?.length} plays
                </span>
            </div>
        </div>
    );
};

export default QuizRect;
