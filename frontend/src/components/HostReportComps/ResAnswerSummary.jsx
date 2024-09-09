import AnswerSummary from "../../components/ResultComps/AnswerSummary";
const ResAnswerSummary = ({ toShow, userResult, getUserName }) => {
    return (
        <div
            className={`p-2 md:w-[50%] bg-mainBg rounded 
          flex-col gap-3 items-center ${
              toShow === "QA" ? "flex" : "hidden"
          } md:flex`}
        >
            <div className="flex gap-3 w-full">
                {/* Title Leaderboard */}
                <div
                    className={`text-center p-2 border
                    border-grayFive rounded isidoraBold
                    text-[13px] flex-1 hidden md:flex justify-center`}
                >
                    {getUserName() && getUserName()?.nickname + "'s "}
                    Answer Summary
                </div>
            </div>
            <AnswerSummary
                // style={{ paddingBottom: "100px" }}
                edit={"max-h-full w-full"}
                results={userResult}
            />
        </div>
    );
};

export default ResAnswerSummary;
