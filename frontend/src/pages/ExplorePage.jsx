import { useState } from "react";
import QuizzesRow from "../components/ExploreComps/QuizzesRow";
import QuizSettings from "../components/QuizSettings";
import Hero from "../components/ExploreComps/Hero";
import SearchTrigger from "../components/SearchTrigger";
import Categories from "../components/ExploreComps/Categories";

const ExplorePage = () => {
  const [showQuizPanel, setShowQuizPanel] = useState(false);
  const [categories] = useState([
    "General Knowledge",
    "Entertainment",
    "Science+Technology",
    "Sports",
    "Pop Culture",
    "Academic",
    "Lifestyle",
    "Miscellaneous",
  ]);

  return (
    <div
      className="md:pl-[200px] isidoraReg text-textColor 
            pt-[70px] pb-10 pl-[35px] bg-mainBg min-h-screen"
    >
      <SearchTrigger />
      <QuizSettings setShow={setShowQuizPanel} show={showQuizPanel} />
      {/* Hero section */}
      <Hero setShowQuizPanel={setShowQuizPanel} />
      {/* Categories menu */}
      <Categories />
      {/* Quizzes rows */}
      <div className="flex flex-col gap-5">
        {categories.map((category, index) => {
          return <QuizzesRow category={category} key={index} />;
        })}
      </div>
    </div>
  );
};

export default ExplorePage;
