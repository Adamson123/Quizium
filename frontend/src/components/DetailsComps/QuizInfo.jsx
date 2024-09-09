import { useRef, useState } from "react";
import quizImg2 from "../../assets/images/defaultCover/quizium-1.webp";
import user from "../../assets/images/defaultProfile/newUser.png";
import bufferToObjUrl from "../../utils/bufferToObjUrl";
import convtToSimpleDate from "../../utils/convtToSimpleDate";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { addToFavorites } from "../../api/UserApi";
import Share from "../Share";
import { useNavigate, useParams } from "react-router";
import { createHost } from "../../api/HostApi";
import Loading from "../ui/Loading";
import HoverForInfo from "../HoverForInfo";
const QuizInfo = ({
    quizInfo,
    isLoading,
    setAllQuizDetails,
    openQuizMenu,
    setOpenQuizMenu,
}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { mutateAsync: addToFavoriteFunc, isLoading: isUpdating } =
        useMutation(addToFavorites);

    const { mutateAsync: createHostFunc, isLoading: isHosting } =
        useMutation(createHost);

    const inFavorites = (id) => {
        console.log(quizInfo.viewerFavorites, id);
        return quizInfo.viewerFavorites?.includes(id);
    };

    const [showShare, setShowShare] = useState({ open: false, url: "" });
    const addToFavorite = async (id, value) => {
        if (isUpdating) {
            return;
        }

        const formData = new FormData();
        formData.append("settings", JSON.stringify({ favorite: !value }));
        formData.append("file", {});

        const promise = addToFavoriteFunc({ id, returnSingleQuiz: true });
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

        console.log(res);

        const { quiz, viewerFavorites } = res;

        setAllQuizDetails({ quiz, viewerFavorites });
    };

    const hostLive = async () => {
        if (isHosting) {
            return;
        }
        const res = await createHostFunc({
            id,
            questionsLength: quizInfo.questLength,
            applyTime: quizInfo.applyTime,
            title: quizInfo.title,
        });
        console.log(res);
        navigate("/host-live/" + res.id);
    };
    const getQuizType = () => {
        const type =
            quizInfo?.applyTime === "entire"
                ? "Exam-Style Scoring"
                : "Speed-Based Scoring";

        const description =
            quizInfo?.applyTime === "entire"
                ? `Focus on accuracy with a single time limit for the whole quiz.
         No extra points for speed, so take your time and get it right.`
                : `Answer quickly to score more, Each question has a timer,
         and faster responses mean higher points. 
         Accuracy still matters, so think fast.`;

        return { type, description };
    };
    return (
        <div
            className="md:max-w-[50%] w-full mb-6 scrollbar 
        md:max-h-screen md:overflow-y-auto"
        >
            {/* Cover Image */}
            <div className="w-full h-[300px] mb-3">
                {!isLoading ? (
                    <img
                        src={
                            quizInfo.coverImg
                                ? bufferToObjUrl(quizInfo.coverImg)
                                : quizImg2
                        }
                        alt="quiz cover image"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="h-full w-full skeleton rounded-none"></div>
                )}
            </div>
            {/* Texts */}
            <div className="px-3 flex flex-col items-center gap-3">
                {/* Title */}
                <div className="flex w-full relative justify-center">
                    <h1
                        className="isidoraBold text-3xl max-w-[70%]
                     md:max-w-[75%] text-center break-words"
                    >
                        {quizInfo?.title}
                    </h1>
                    {/* share , add to favorites */}
                    {!isLoading && (
                        <span
                            onClick={(event) => {
                                event.stopPropagation();
                                setOpenQuizMenu(!openQuizMenu);
                            }}
                            style={{
                                transition: "background 0.4s ease-in-out",
                            }}
                            className="py-2 px-3 hover:bg-[rgba(0,0,0,0.3)] 
                 rounded-full cursor-pointer text-right absolute right-0"
                        >
                            <span className="bi-three-dots"></span>
                        </span>
                    )}
                    {/* quiz three dots menu */}
                    {openQuizMenu && (
                        <div
                            onClick={(event) => {
                                event.stopPropagation();
                                // setQuizIndex(index);
                            }}
                            className="absolute right-0
                    top-10 shadow-md p-4 isidoraSemiBold
                    flex flex-col gap-5 bg-mainBg z-10 shadowAround"
                        >
                            <p
                                onClick={() => {
                                    addToFavorite(
                                        quizInfo._id,
                                        inFavorites(quizInfo._id)
                                    );
                                }}
                                className="flex items-center gap-4 
                            hover:text-shinyPurple cursor-pointer"
                            >
                                <span
                                    className={`bi-star-fill ${
                                        inFavorites(quizInfo._id) &&
                                        "text-orange-500"
                                    } `}
                                ></span>
                                <span className="text-[14px]">
                                    {inFavorites(quizInfo._id)
                                        ? "Remove from"
                                        : "Add to"}{" "}
                                    favorites
                                </span>
                            </p>

                            <p
                                onClick={() =>
                                    setShowShare({
                                        open: true,
                                        url: `${window.location.origin}/details/${quizInfo._id}`,
                                    })
                                }
                                className="flex items-center gap-4 
                                hover:text-shinyPurple cursor-pointer"
                            >
                                <span className="bi-share-fill"></span>
                                <span className="text-[14px]">Share</span>
                            </p>
                        </div>
                    )}
                </div>

                {quizInfo?.description && (
                    <p className="text-[12px] text-center">
                        {quizInfo.description}
                    </p>
                )}

                <div
                    className="isidoraSemiBold text-[13px] text-grayFive 
        flex justify-center flex-wrap gap-2 "
                >
                    {/* plays */}
                    <p>
                        <span className="bi-play-fill"></span> {quizInfo?.plays}{" "}
                        plays{" "}
                    </p>

                    <span className="bi-dot font-bold"></span>
                    {/* questions */}
                    <p>
                        <span className="bi-patch-question-fill"></span>{" "}
                        {quizInfo?.questLength || 0} questions
                    </p>
                    <span className="bi-dot font-bold"></span>
                    {/* category */}
                    <p>
                        <span className="bi-tag"></span> {quizInfo?.category}
                    </p>
                    <span className="bi-dot font-bold"></span>
                    {/* Scoring */}
                    <p className="text-[13px] flex gap-1">
                        <span className="bi-journal-text"></span>{" "}
                        {getQuizType()?.type}
                        {!isLoading && (
                            <HoverForInfo
                                text={getQuizType()?.description}
                                edit={"-right-3"}
                                parentEdit={"cursor-pointer"}
                            />
                        )}
                    </p>
                </div>

                {/* Play  , host live */}
                <div className="flex gap-2">
                    <button
                        onClick={() => navigate(`/play/${id}`)}
                        className="bg-shinyPurple w-24 h-10 rounded 
                    insetShadow isidoraBold text-[14px] clickable"
                    >
                        Play
                    </button>
                    <button
                        onClick={() => hostLive()}
                        className="bg-grayTwo w-24 h-10 rounded
                        insetShadow isidoraBold text-[14px] clickable flex 
                        items-center justify-center"
                    >
                        {isHosting ? (
                            <Loading cus={"text-[14px]"} />
                        ) : (
                            "Host live"
                        )}
                    </button>
                </div>
                {/* created by */}
                <div
                    className="flex items-center text-[13px]
                    isidoraSemiBold gap-2 mt-3 flex-col"
                >
                    {/* profile image */}
                    <div className="h-[35px] w-[35px]">
                        {!isLoading ? (
                            <img
                                src={
                                    quizInfo.profileImg
                                        ? bufferToObjUrl(quizInfo.profileImg)
                                        : user
                                }
                                alt="quiz creator image"
                                className="w-full h-full rounded-full object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <div className="h-full w-full skeleton rounded-full"></div>
                        )}
                    </div>
                    {/* name and date quiz was created */}
                    <div className="flex flex-col text-center">
                        <span>{quizInfo?.name}</span>
                        <span className="text-[10px] text-grayFive">
                            created on{" "}
                            {quizInfo.createdAt &&
                                convtToSimpleDate(quizInfo?.createdAt)}
                        </span>
                    </div>
                </div>
            </div>
            <Share showShare={showShare} setShowShare={setShowShare} />
        </div>
    );
};

export default QuizInfo;
