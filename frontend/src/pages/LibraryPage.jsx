import { useQuery } from "react-query";
import { getUserQuizzes } from "../api/QuizApi";
import LoadingQuizzes from "../components/LibrayComps/LoadingQuizzes";
import { useContext, useEffect, useState } from "react";
import { dataContext } from "../layouts/Layout";
import QuizRect from "../components/LibrayComps/QuizRect";
import Loading from "../components/ui/Loading";
import Share from "../components/Share";
import box from "../assets/svg/empty-box2.svg";
import searchSvg from "../assets/svg/search.svg";

const LibraryPage = () => {
    const { data, isLoading } = useQuery(["user-allQuizzes"], getUserQuizzes, {
        retry: false,
    });
    const [allQuizzes, setAllQuizzes] = useState([]);
    const [filterBy, setFilterBy] = useState("published");
    const [filteredQuizzes, setFilteredQuizzes] = useState([]);
    const [quizIndex, setQuizIndex] = useState(-1);

    const [byTime, setByTime] = useState("recent");
    const [showShare, setShowShare] = useState({ open: false, url: "" });

    const value = useContext(dataContext);
    const { search, userId } = value;

    const filterQuizzesFunc = (fby) => {
        if (fby === "played") {
            return [];
        }
        if (fby === "favorites") {
            return allQuizzes.favoriteQuizzes?.favorites;
        }

        console.log("populated");

        return allQuizzes.createdQuizzes.filter((quiz) => {
            //if filterBy is drafts we will filter by allQuizzes that are drafted, esle will filter by the once that not drafted
            if (fby === "drafts") {
                return quiz.draft && quiz;
            } else if (fby === "published") {
                return !quiz.draft && quiz;
            }
        });
    };

    console.log(data);

    useEffect(() => {
        if (data) {
            setAllQuizzes(data);
        }
    }, [data]);

    useEffect(() => {
        if (allQuizzes.createdQuizzes) {
            let filteredQuiz =
                byTime === "recent"
                    ? filterQuizzesFunc(filterBy).sort(
                          (a, b) =>
                              new Date(b.createdAt) - new Date(a.createdAt)
                      )
                    : filterQuizzesFunc(filterBy).sort(
                          (a, b) =>
                              new Date(a.createdAt) - new Date(b.createdAt)
                      );

            if (search.trim(" ")) {
                filteredQuiz = filteredQuiz.filter((quiz) => {
                    return quiz.title
                        .toLowerCase()
                        .includes(search.trim(" ").toLowerCase());
                });
            }

            console.log(byTime);

            setFilteredQuizzes(filteredQuiz);
        }
    }, [allQuizzes, filterBy, byTime, search]);

    const [quizzesNav, setQuizzesNav] = useState([
        {
            text: "published",
            icon: "bi-check-circle-",
        },
        {
            text: "drafts",
            icon: "bi-file-earmark-text-",
        },
        {
            text: "played",
            icon: "bi-play-",
        },
        {
            text: "favorites",
            icon: "bi-star-",
        },
    ]);

    return (
        <div
            onClick={() => setQuizIndex(-1)}
            className="min-h-screen bg-secMainBg pt-20 pb-28 px-5 
            md:pl-[210px] text-textColor"
        >
            <h1 className="text-2xl isidoraBold">Your Library</h1>

            <div
                className="flex mt-6 text-[13px] 
                pt-5 border-b-[2px] border-mainBg 
                h-[70px]"
            >
                <div
                    className="flex justify-start gap-5 md:gap-8
                    text-[13px] mb-[-3px] overflow-x-auto scrollbar"
                >
                    {quizzesNav.map((nav, index) => {
                        return (
                            <span
                                key={index}
                                onClick={() => setFilterBy(nav.text)}
                                className={`cursor-pointer px-3 py-3 text-[14px] isidoraBold 
                            ${filterBy === nav.text && "border-b-[3px]"}
                        rounded-[1px] border-shinyPurple mb[-5px] shrink-0`}
                            >
                                <span className={nav.icon}></span>{" "}
                                {nav.text[0].toUpperCase() +
                                    nav.text.substring(1, nav.text.length)}{" "}
                                &nbsp;
                                {allQuizzes.createdQuizzes &&
                                    filterQuizzesFunc(nav.text).length}
                            </span>
                        );
                    })}
                </div>
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
            <div className="p-3 bg-mainBg mt-10 flex flex-col gap-5 rounded relative">
                {search && (
                    <p className="isidoraSemiBold absolute top-[-23px] left-0 text-[13px]">
                        {filteredQuizzes.length} results was found for "{search}
                        "
                    </p>
                )}
                {isLoading && (
                    <Loading
                        cus={`absolute z-[1] left-[50%] text-shinyPurple`}
                    />
                )}
                {!isLoading ? (
                    filteredQuizzes.map((quiz, index) => {
                        /* Quiz */
                        return (
                            <QuizRect
                                quiz={quiz}
                                index={index}
                                quizIndex={quizIndex}
                                setQuizIndex={setQuizIndex}
                                key={index}
                                setAllQuizzes={setAllQuizzes}
                                setShowShare={setShowShare}
                                allQuizzes={allQuizzes}
                                userId={userId}
                            />
                        );
                    })
                ) : (
                    <LoadingQuizzes />
                )}

                {!isLoading && !filteredQuizzes?.length && (
                    <div
                        className="w-full h-64 flex justify-center
                     items-center m-auto relative"
                    >
                        <img
                            src={search ? searchSvg : box}
                            alt="empty box signifies no quiz was found"
                            className="h-40 w-40"
                        />
                    </div>
                )}
            </div>
            {filteredQuizzes && (
                <Share showShare={showShare} setShowShare={setShowShare} />
            )}
        </div>
    );
};

export default LibraryPage;
