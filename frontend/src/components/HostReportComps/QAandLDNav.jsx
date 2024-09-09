const QAandLDNav = ({ getUserName, toShow, setToShow }) => {
    return (
        <div
            className="flex gap-2 px-2 pt-2 rounded-tr rounded-tl
         bg-mainBg visible md:hidden translate-y-3 text-[11px]"
        >
            <div
                onClick={() => setToShow("LD")}
                className={`text-center p-2 border
                border-grayFive rounded isidoraBold 
                flex-1 cursor-pointer ${
                    toShow === "LD" &&
                    `text-shinyPurple border-shinyPurple 
                    md:border-grayFive md:text-white`
                }`}
            >
                Leaderboard
            </div>

            <div
                onClick={() => setToShow("QA")}
                className={`text-center p-2 border
                border-grayFive rounded isidoraBold 
                flex-1 cursor-pointer ${
                    toShow === "QA" &&
                    `text-shinyPurple border-shinyPurple 
                    md:border-grayFive md:text-white`
                }`}
            >
                {getUserName() && getUserName()?.nickname + "'s "}
                Answer Summary
            </div>
        </div>
    );
};

export default QAandLDNav;
