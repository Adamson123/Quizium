import { useQuery } from "react-query";
import { getUserQuizzes } from "../api/QuizApi";
import LoadingQuizzes from "../components/LibrayComps/LoadingQuizzes";
import { useContext, useEffect, useState } from "react";
import { dataContext } from "../layouts/Layout";
import QuizRect from "../components/LibrayComps/QuizRect";
import Loading from "../components/ui/Loading";
import Share from "../components/LibrayComps/Share";

const LibraryPage = () => {
    const { data, isLoading, error, refetch } = useQuery(
        ["user-quizzes"],
        getUserQuizzes,
        {
            retry: false,
        }
    );
    const [quizzes, setQuizzes] = useState([]);
    const [filterBy, setFilterBy] = useState("published");
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);
    const [quizIndex, setQuizIndex] = useState(-1);

    const [byTime, setByTime] = useState("recent");
    const [showShare, setShowShare] = useState({ open: false, url: "" });

    const value = useContext(dataContext);
    const { search } = value;

    const filterQuizzesFunc = (fby) => {
        return quizzes.filter((quiz, index) => {
            //if filterBy is drafts we will filter by quizzes that are drafted, esle will filter by the once that not drafted
            if (fby === "drafts") {
                return quiz.draft && quiz;
            } else {
                return !quiz.draft && quiz;
            }
        });
    };

    useEffect(() => {
        if (data) {
            setQuizzes(data);
        }
    }, [data]);

    useEffect(() => {
        if (quizzes) {
            if (filterBy === "published" || filterBy === "drafts") {
                const filteredQuiz =
                    byTime === "recent"
                        ? filterQuizzesFunc(filterBy).reverse()
                        : filterQuizzesFunc(filterBy);

                setFilteredQuizzes(filteredQuiz);
            }
        }
    }, [quizzes, filterBy, byTime]);

    return (
        <div
            onClick={() => setQuizIndex(-1)}
            className="min-h-screen bg-secMainBg pt-20 pb-28 px-5 
            md:pl-[210px] text-textColor"
        >
            <h1 className="text-2xl isidoraBold">Your Library</h1>

            <div
                className="flex justify-start gap-5 mt-6 text-[13px] 
            pt-5 border-b-[2px] border-mainBg  md:gap-8"
            >
                <span
                    onClick={() => setFilterBy("published")}
                    className={`cursor-pointer px-5 py-3 text-[14px] isidoraBold 
               ${
                   filterBy === "published" && "border-b-[3px]"
               } rounded-[1px] border-shinyPurple mb-[-3px]`}
                >
                    Published{" "}
                    {filteredQuizzes.length &&
                        filterQuizzesFunc("published").length}
                </span>
                <span
                    onClick={() => setFilterBy("drafts")}
                    className={`cursor-pointer px-5 py-3 text-[14px] isidoraBold 
                        ${
                            filterBy === "drafts" && "border-b-[3px]"
                        } rounded-[1px] border-shinyPurple mb-[-3px]`}
                >
                    Drafts{" "}
                    {filteredQuizzes.length &&
                        filterQuizzesFunc("drafts").length}
                </span>
                <span
                    onClick={() => setFilterBy("played")}
                    className={`cursor-pointer px-5 py-3 text-[14px] isidoraBold 
                        ${
                            filterBy === "played" && "border-b-[3px]"
                        } rounded-[1px] border-shinyPurple mb-[-3px]`}
                >
                    Played 0
                </span>
            </div>

            {/* Recent , Oldest */}
            <div className="flex justify-start">
                <select
                    onChange={(event) => {
                        setByTime(event.target.value);
                    }}
                    className="mt-10 isidoraBold
                        border-2 border-mainBg p-2 px-16 rounded bg-transparent 
                        select outline-none"
                >
                    <option value="recent" className="bg-mainBg">
                        Recent
                    </option>
                    <option value="oldest" className="bg-mainBg">
                        Oldest
                    </option>
                </select>
            </div>

            {/* Quizzes */}
            <div className="p-3 bg-mainBg mt-7 flex flex-col gap-5 rounded relative">
                {isLoading && (
                    <Loading
                        cus={`absolute z-[1] left-[50%] text-shinyPurple`}
                    />
                )}
                {!isLoading ? (
                    filteredQuizzes.map((quiz, index) => {
                        /* Quiz */
                        return (
                            quiz.title
                                .toLowerCase()
                                .includes(search.trim(" ").toLowerCase()) && (
                                <QuizRect
                                    quiz={quiz}
                                    index={index}
                                    quizIndex={quizIndex}
                                    setQuizIndex={setQuizIndex}
                                    key={index}
                                    setQuizzes={setQuizzes}
                                    setShowShare={setShowShare}
                                />
                            )
                        );
                    })
                ) : (
                    <LoadingQuizzes />
                )}
            </div>
            {filteredQuizzes && (
                <Share showShare={showShare} setShowShare={setShowShare} />
            )}
        </div>
    );
};

export default LibraryPage;
