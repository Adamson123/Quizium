import { useNavigate } from "react-router";
import bufferToObjUrl from "../../utils/bufferToObjUrl";
import quizImg from "../../assets/images/defaultCover/quizium-8.webp";

import { deleteQuiz } from "../../api/QuizApi";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import convtToSimpleDate from "../../utils/convtToSimpleDate";
import { addToFavorites } from "../../api/UserApi";
import shortenText from "../../utils/shortenText";

const QuizRect = ({
    quiz,
    index,
    quizIndex,
    setQuizIndex,
    setAllQuizzes,
    setShowShare,
    allQuizzes,
    userId,
}) => {
    const navigate = useNavigate();

    const { mutateAsync: deleteQuizFunc, isLoading } = useMutation(deleteQuiz);
    const { mutateAsync: addToFavoriteFunc, isLoading: isUpdating } =
        useMutation(addToFavorites);

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

        const promise = addToFavoriteFunc({ id });
        toast.promise(promise, {
            loading: !value ? "Adding to favorites" : "Removing from favorites",
            success: (data) => {
                return data.msg;
            },
            error: !value
                ? "Error Adding to favorites"
                : "Error Removing from favorites",
        });

        const res = await promise;
        if (res.err) {
            return;
        }

        setAllQuizzes(res);
        setQuizIndex(-1);
    };

    const inFavorites = (id) => {
        let match = false;

        allQuizzes.favoriteQuizzes?.favorites.forEach((fav) => {
            if (fav._id === id) {
                match = true;
            }
        });
        return match;
    };

    return (
        <div
            onClick={() =>
                quiz.draft
                    ? navigate(`/quiz-editor/${quiz._id}`)
                    : navigate(`/details/${quiz._id}`)
            }
            key={index}
            className="flex items-center border-b pb-5 
    border-grayOne cursor-pointer gap-3 relative"
        >
            {/* image */}
            <div className="max-w-16 min-w-16 h-16 shadow">
                <img
                    src={
                        quiz.coverImg
                            ? bufferToObjUrl(quiz.coverImg.image.data.data)
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
                    <h3 className="isidoraBold">
                        {
                            /* Title for small screen */
                            <span className="slg:hidden">
                                {shortenText(quiz.title, 35)}
                            </span>
                        }
                        {
                            /* Title for big screen */
                            <span className="hidden slg:block">
                                {quiz.title}
                            </span>
                        }
                    </h3>
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
                                ? convtToSimpleDate(quiz.createdAt)
                                : "25 Feb 2006"
                        }
                    </span>
                </div>
                {/* open quiz menu */}
                <div>
                    <span
                        onClick={(event) => {
                            event.stopPropagation();
                            setQuizIndex(quizIndex !== index ? index : -1);
                        }}
                        style={{
                            transition: "background 0.4s ease-in-out",
                        }}
                        className="py-2 px-3 hover:bg-[rgba(0,0,0,0.3)] 
                        rounded-full cursor-pointer text-right absolute right-0"
                    >
                        <span className="bi-three-dots-vertical text-[15px]"></span>
                    </span>
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
                    top-10 shadow-md p-4 isidoraSemiBold
                    flex flex-col gap-5 bg-mainBg z-10 shadowAround"
                >
                    {userId === quiz.createdBy && (
                        <p
                            onClick={() => editFunc(quiz._id)}
                            className="flex items-center gap-4 hover:text-shinyPurple"
                        >
                            <span className="bi-pencil-fill"></span>
                            <span className="text-[14px]">Edit</span>
                        </p>
                    )}
                    <p
                        onClick={() => {
                            addToFavorite(quiz._id, inFavorites(quiz._id));
                        }}
                        className="flex items-center gap-4 hover:text-shinyPurple"
                    >
                        <span
                            className={`bi-star-fill ${
                                inFavorites(quiz._id) && "text-orange-500"
                            }`}
                        ></span>
                        <span className="text-[14px]">
                            {inFavorites(quiz._id) ? "Remove from" : "Add to"}{" "}
                            favorites
                        </span>
                    </p>

                    {userId === quiz.createdBy && (
                        <p
                            onClick={() => handleDeleteQuiz(quiz._id)}
                            className="flex items-center gap-4 hover:text-shinyPurple"
                        >
                            <span className="bi-trash-fill"></span>
                            <span className="text-[14px]">Delete</span>
                        </p>
                    )}
                    {!quiz.draft && (
                        <p
                            onClick={() => {
                                setQuizIndex(-1);
                                setShowShare({
                                    open: true,
                                    url: `${window.location.origin}/details/${quiz._id}`,
                                });
                            }}
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
