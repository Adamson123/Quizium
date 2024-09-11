import { useQuery } from "react-query";
import { searchQuizzes } from "../api/QuizApi";
import Filters from "../components/SearchComps/Filters";
import QuizRect from "../components/SearchComps/QuizRect";
import LoadingQuizzes from "../components/LibrayComps/LoadingQuizzes";
import searchSvg from "../assets/svg/search3.svg";
const SearchPage = () => {
    const { refetch, isLoading, data, isRefetching } = useQuery(
        ["search"],
        searchQuizzes,
        {
            retry: false,
        }
    );

    console.log(data);

    return (
        <div
            className="md:pl-[195px] isidoraReg 
        text-textColor min-h-screen
         pt-[80px] px-3 flex flex-col items-cente"
        >
            <div className="flex flex-col gap-7">
                {/* Filters */}
                <Filters refetch={refetch} isLoading={isLoading} />
                {/* results */}
                <div className="flex flex-col gap-2">
                    {!isLoading && !isRefetching ? (
                        data?.quizzes.length ? (
                            data?.quizzes?.map((quiz, index) => {
                                return <QuizRect quiz={quiz} key={index} />;
                            })
                        ) : (
                            <div
                                className="w-full h-[370px] flex justify-center
                                  items-center m-auto flex-col relative text-3xl"
                            >
                                <div className="absolute top-[25px] isidoraBold text-mainBg">
                                    No quiz was found
                                </div>
                                <img
                                    src={searchSvg}
                                    alt="signifies no quiz was found"
                                    className="h-full w-full"
                                />
                            </div>
                        )
                    ) : (
                        <LoadingQuizzes edit={"bg-mainBg p-2 rounded"} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
