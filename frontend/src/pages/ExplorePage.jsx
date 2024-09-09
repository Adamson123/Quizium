import { useContext, useEffect, useState } from "react";
import QuizzesRow from "../components/ExploreComps/QuizzesRow";
import QuizSettings from "../components/QuizSettings";
import Hero from "../components/ExploreComps/Hero";
import { dataContext } from "../layouts/Layout";

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

    const { search, setSearch, setSearchFocus, searchFocus } =
        useContext(dataContext);

    useEffect(() => {
        const startSearch = (event) => {
            if (event.key === "Enter" && search.trim(" ") && searchFocus) {
                alert(search);
            }
        };
        window.addEventListener("keyup", startSearch);

        return () => {
            window.removeEventListener("keyup", startSearch);
        };
    }, [searchFocus, search]);

    /* 
     let's call the background that appears when searching searchB
     1. searchB will appear if search bar is focus
     2. 
    */
    return (
        <div
            className="md:pl-[200px] isidoraReg text-textColor 
            py-[100px] pl-[35px] bg-mainBg min-h-screen"
        >
            {searchFocus && (
                <div
                    onClick={() => {
                        setSearchFocus(false);
                    }}
                    className="fixed left-0 bottom-0 right-0
             top-0 bg-transparentBlack z-10"
                ></div>
            )}
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
