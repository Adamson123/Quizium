import quizImg from "../assets/images/defaultCover/quizium-8.webp";
import quizImg2 from "../assets/images/defaultCover/quizium-3.webp";
import { useQuery } from "react-query";
import { getUserQuizzes } from "../api/QuizApi";
import BufferToObjUrl from "../utils/BufferToObjUrl";
import LoadingQuizzes from "../components/LibrayComps/LoadingQuizzes";
const LibraryPage = () => {
    const { data, isLoading, error, refetch } = useQuery(
        ["user-quizzes"],
        getUserQuizzes,
        {
            retry: false,
        }
    );

    console.log(data);

    return (
        <div className="pt-20 pb-10 px-5 md:pl-[210px]">
            <h1 className="text-2xl isidoraBold text-center">Your Library</h1>

            <div
                className="flex justify-start gap-5 mt-6 text-[13px] 
            pt-5 border-b-[2px] border-mainBg  md:gap-8"
            >
                <span
                    className="cursor-pointer px-5 py-3 text-[14px] isidoraBold 
                border-b-[3px] rounded-[1px] border-shinyPurple mb-[-3px]"
                >
                    Published 0
                </span>
                <span
                    className="cursor-pointer px-5 py-3 text-[14px] isidoraBold 
                border-b-3px] border-shinyPurple"
                >
                    Drafts 0
                </span>
                <span
                    className="cursor-pointer px-5 py-3 text-[14px] isidoraBold
                 border-b-3px] border-shinyPurple"
                >
                    Played 0
                </span>
            </div>

            {/* Recent , Oldest */}
            <div className="flex justify-start">
                <select
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
            <div className="p-3 bg-mainBg mt-7 flex flex-col gap-5 rounded">
                {!isLoading ? (
                    data.map((quiz, index) => {
                        /* Quiz */
                        return (
                            <div
                                key={index}
                                className="flex items-center border-b pb-5 border-grayOne cursor-pointer gap-3"
                            >
                                {/* image */}
                                <div className="max-w-16 min-w-16 h-16 shadow">
                                    <img
                                        src={
                                            quiz.coverImg
                                                ? BufferToObjUrl(
                                                      quiz.coverImg.image.data
                                                          .data
                                                  )
                                                : quizImg
                                        }
                                        alt="quiz image"
                                        className="w-full h-full rounded object-top"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="flex justify-between w-full">
                                    {/* Info */}
                                    <div className="flex flex-col">
                                        <h3 className="isidoraBold">
                                            {quiz.title}
                                        </h3>
                                        <span className="text-[13px] text-grayFive isidoraSemiBold">
                                            <span className="bi-tag"></span>{" "}
                                            {quiz.category} &nbsp;
                                            <span className="text-[10px] bg-green-600 p-1 rounded text-green-300">
                                                Draft
                                            </span>
                                        </span>
                                        <span className="text-[11px] text-grayFive isidoraSemiBold">
                                            <span className="bi-clock"></span>{" "}
                                            25 Feb 2006
                                        </span>
                                    </div>
                                    {/* menu */}
                                    <div>
                                        <span className="bi-three-dots-vertical"></span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <LoadingQuizzes />
                )}
            </div>
        </div>
    );
};

export default LibraryPage;
