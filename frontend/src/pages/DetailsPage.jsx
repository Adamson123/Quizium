import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getQuizWithQuestions } from "../api/QuizApi";
import { useEffect, useMemo, useState } from "react";
import QuizInfo from "../components/DetailsComps/QuizInfo";
import Questions from "../components/DetailsComps/Questions";
import toast from "react-hot-toast";
import SearchTrigger from "../components/SearchTrigger";

const DetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isLoading, error, refetch } = useQuery(
        ["quiz-questions", id],
        () => getQuizWithQuestions({ id, checkOwner: false }),
        {
            retry: false,
        }
    );

    const [quizInfo, setQuizInfo] = useState({});

    const [allQuizDetails, setAllQuizDetails] = useState();
    const [openQuizMenu, setOpenQuizMenu] = useState(false);

    useEffect(() => {
        if (data) {
            setAllQuizDetails(data);
        }
    }, [data]);

    useEffect(() => {
        if (allQuizDetails) {
            console.log(allQuizDetails, "allQuizDt");

            const {
                category,
                description,
                title,
                createdAt,
                numOfPlays,
                coverImg,
                questionsId,
                createdBy,
                _id,
                applyTime,
            } = allQuizDetails.quiz;
            const { viewerFavorites } = allQuizDetails;

            const info = {
                category,
                description,
                title,
                createdAt,
                plays: numOfPlays.length,
                coverImg: coverImg?.image.data.data,
                questLength: questionsId?.questions.length,
                name: createdBy.name,
                profileImg: createdBy?.profileImg?.image.data.data,
                //favorites: createdBy?.favorites,
                viewerFavorites: viewerFavorites || [],
                _id,
                applyTime,
            };
            setQuizInfo(info);
        }
    }, [allQuizDetails]);

    const questions = useMemo(() => {
        if (allQuizDetails) {
            console.log(
                allQuizDetails.quiz.questionsId?.questions,
                "questions"
            );
            return allQuizDetails.quiz.questionsId?.questions;
        }
    }, [allQuizDetails]);

    console.log("Details Page Rendered");

    if (!data && !isLoading) {
        toast.error(error.err);
        return navigate("/");
    }

    return (
        <div
            onClick={() => openQuizMenu && setOpenQuizMenu(false)}
            className="max-h-screen bg-secMainBg pt-[65px]
            md:pl-[185px] text-textColor md:flex md:justify-center"
        >
            <SearchTrigger />
            {/* info */}
            <QuizInfo
                quizInfo={quizInfo}
                isLoading={isLoading}
                setAllQuizDetails={setAllQuizDetails}
                openQuizMenu={openQuizMenu}
                setOpenQuizMenu={setOpenQuizMenu}
            />
            {/* Questions */}
            {!isLoading ? (
                <Questions questions={questions} />
            ) : (
                <div className="flex flex-col px-3 w-full md:max-w-[50%] gap-2 md:mt-2">
                    <div className="flex justify-between mb-5">
                        <div className="w-32 h-[34px] skeleton rounded-none"></div>

                        <div className="w-32 h-[34px] skeleton rounded-none"></div>
                    </div>
                    <div className="skeleton min-h-[90px] w-full rounded-none"></div>
                    <div className="skeleton min-h-[90px] w-full rounded-none"></div>
                    <div className="skeleton min-h-[90px] w-full rounded-none"></div>
                    <div className="skeleton min-h-[90px] w-full rounded-none"></div>
                </div>
            )}
        </div>
    );
};

export default DetailsPage;
