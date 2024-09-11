import { useState } from "react";
import QuizzesRow from "../components/ExploreComps/QuizzesRow";
import QuizSettings from "../components/QuizSettings";
import Hero from "../components/ExploreComps/Hero";
import SearchTrigger from "../components/SearchTrigger";

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
        "Miscellaneuos",
    ]);

    return (
        <div
            className="md:pl-[200px] isidoraReg text-textColor 
            py-[100px] pl-[35px] bg-mainBg min-h-screen"
        >
            <SearchTrigger />
            <QuizSettings setShow={setShowQuizPanel} show={showQuizPanel} />
            {/* Hero section */}
            <Hero setShowQuizPanel={setShowQuizPanel} />
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
