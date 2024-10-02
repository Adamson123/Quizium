import { useQuery } from "react-query";
import { searchQuizzes } from "../api/QuizApi";
import Filters from "../components/SearchComps/Filters";
import QuizRect from "../components/SearchComps/QuizRect";
import LoadingQuizzes from "../components/LibrayComps/LoadingQuizzes";
import searchSvg from "../assets/svg/search3.svg";
import QuizSettings from "../components/QuizSettings";
import { useMemo, useState } from "react";

const SearchPage = () => {
  const { refetch, isLoading, data, isRefetching } = useQuery(
    ["search"],
    searchQuizzes,
    {
      retry: false,
    }
  );
  const [showQuizPanel, setShowQuizPanel] = useState(false);

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
                className="w-full h-full flex justify-center
                items-center m-auto flex-col relative"
              >
                <div className="isidoraBold text-mainBg translate-y-7 text-3xl">
                  No quiz was found
                </div>
                <img
                  src={searchSvg}
                  alt="signifies no quiz was found"
                  className="h-[300px] w-[300px]"
                />
                <div className="flex flex-col items-center -translate-y-7 gap-2">
                  <p className="text-center text-[14px]">
                    Can't find what you are looking for?
                  </p>
                  <button
                    onClick={() => setShowQuizPanel(true)}
                    className="bg-shinyPurple rounded 
                    insetShadow text-xs px-3 py-2 isidoraBold clickable"
                  >
                    Create a Quiz
                  </button>
                </div>
                <QuizSettings setShow={setShowQuizPanel} show={showQuizPanel} />
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
