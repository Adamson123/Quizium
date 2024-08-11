import { useNavigate } from "react-router";
import BufferToObjUrl from "../../utils/bufferToObjUrl";
import quizImg from "../../assets/images/defaultCover/quizium-8.webp";
import quizImg2 from "../../assets/images/defaultCover/quizium-3.webp";
import { deleteQuiz, updateQuiz } from "../../api/QuizApi";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import { forwardRef } from "react";

const QuizRect = ({
    quiz,
    index,
    quizIndex,
    setQuizIndex,
    setAllQuizzes,
    setShowShare,
}) => {
    const navigate = useNavigate();

    const { mutateAsync: deleteQuizFunc, isLoading } = useMutation(deleteQuiz);
    const { mutateAsync: updateQuizFunc, isLoading: isUpdating } =
        useMutation(updateQuiz);
    const createdDate = (date) => {
        /* default format is example: 2024-08-01T22:26:36.575Z*/
        const [year, month, day] = date.split("-");

        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const formatedDate = `${day.substring(0, day.indexOf("T"))} ${
            months[Number(month) - 1]
        } ${year}`;

        return formatedDate;
    };

    const editFunc = (id) => {
        const quizPath = `/quiz-editor/${id}`;
        navigate(quizPath);
    };

    const handleDeleteQuiz = async (id) => {
        setQuizIndex(-1);
        if (isLoading) {
            return;
        }

        const promise = deleteQuizFunc(id);
        toast.promise(promise, {
            loading: "Deleting quiz",
            success: (data) => {
                return data.msg;
            },
            error: (data) => {
                return data.err;
            },
        });

        const res = await promise;

        setAllQuizzes(res.quizzes);
    };

    const addToFavorite = async (id, value) => {
        if (isLoading) {
            return;
        }

        const formData = new FormData();
        formData.append("settings", JSON.stringify({ favorite: !value }));
        formData.append("file", {});

        const promise = updateQuizFunc({ id, formData });
        toast.promise(promise, {
            loading: !value ? "Adding to favorite" : "Removing from favorite",
            success: !value ? "Added to favorite" : "Removed from favorite",
            error: !value
                ? "Error Adding to favorite"
                : "Error Removing from favorite",
        });

        const res = await promise;

        setAllQuizzes(res.quizzes);
    };

    // console.log(quizRef, "ref");

    return (
        <div
            key={index}
            className="flex items-center border-b pb-5 
    border-grayOne cursor-pointer gap-3 relative"
        >
            {/* image */}
            <div className="max-w-16 min-w-16 h-16 shadow">
                <img
                    src={
                        quiz.coverImg
                            ? BufferToObjUrl(quiz.coverImg.image.data.data)
                            : quizImg
                    }
                    alt="quiz image"
                    className="w-full h-full rounded object-cover"
                    loading="lazy"
                />
            </div>

            <div className="flex justify-between w-full">
                {/* Info */}
                <div className="flex flex-col">
                    <h3 className="isidoraBold">{quiz.title}</h3>
                    <span className="text-[13px] text-grayFive isidoraSemiBold">
                        <span className="bi-tag"></span> {quiz.category} &nbsp;
                        {quiz.draft ? (
                            <span
                                className="text-[10px] bg-[#ff000081] p-1 
                            rounded text-red-500"
                            >
                                <span className="bi-file-earmark-text-fill"></span>
                                &nbsp; Draft
                            </span>
                        ) : (
                            <span className="text-[10px] bg-green-600 p-1 rounded text-green-300">
                                <span className="bi-check-circle-fill"></span>
                                &nbsp; Published
                            </span>
                        )}
                    </span>
                    <span className="text-[11px] text-grayFive isidoraSemiBold">
                        <span className="bi-clock"></span>
                        &nbsp;&nbsp;
                        {
                            /*25 Feb 2006*/
                            quiz?.createdAt
                                ? createdDate(quiz.createdAt)
                                : "25 Feb 2006"
                        }
                    </span>
                </div>
                {/* menu */}
                <div>
                    <span
                        onClick={(event) => {
                            event.stopPropagation();
                            setQuizIndex(index);
                        }}
                        className="bi-three-dots-vertical"
                    ></span>
                </div>
            </div>
            {/* Menu */}
            {quizIndex === index && (
                <div
                    onClick={(event) => {
                        event.stopPropagation();
                        // setQuizIndex(index);
                    }}
                    className="absolute right-0
                    top-4 shadow-md p-4 isidoraSemiBold
                    flex flex-col gap-5 bg-mainBg z-10 shadowAround"
                >
                    <p
                        onClick={() => editFunc(quiz._id)}
                        className="flex items-center gap-4 hover:text-shinyPurple"
                    >
                        <span className="bi-pencil-fill"></span>
                        <span className="text-[14px]">Edit</span>
                    </p>
                    <p
                        onClick={() => {
                            addToFavorite(quiz._id, quiz.favorite);
                        }}
                        className="flex items-center gap-4 hover:text-shinyPurple"
                    >
                        <span
                            className={`bi-star-fill ${
                                quiz.favorite && "text-orange-500"
                            }`}
                        ></span>
                        <span className="text-[14px]">
                            {quiz.favorite ? "Remove from" : "Add to"} favorite
                        </span>
                    </p>

                    <p
                        onClick={() => handleDeleteQuiz(quiz._id)}
                        className="flex items-center gap-4 hover:text-shinyPurple"
                    >
                        <span className="bi-trash-fill"></span>
                        <span className="text-[14px]">Delete</span>
                    </p>
                    {!quiz.draft && (
                        <p
                            onClick={() =>
                                setShowShare(
                                    (s) =>
                                        (s = {
                                            open: true,
                                            url: `${window.location.origin}/quiz-editor/${quiz._id}`,
                                        })
                                )
                            }
                            className="flex items-center gap-4 hover:text-shinyPurple"
                        >
                            <span className="bi-share-fill"></span>
                            <span className="text-[14px]">Share</span>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};
export default QuizRect;
