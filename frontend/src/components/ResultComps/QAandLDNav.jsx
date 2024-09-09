const QAandLDNav = ({ setToShow, toShow, participants }) => {
    return (
        <div className="border-b-[2px] border-mainBg w-full">
            <div
                className="flex justify-start gap-5 md:gap-8
             text-[13px] mb-[-3px] overflow-x-auto scrollbar"
            >
                <span
                    onClick={() => setToShow("QA")}
                    className={`cursor-pointer px-3 py-3 text-[14px] isidoraBold 
               ${
                   toShow === "QA" && "border-b-[3px]"
               } rounded-[1px] border-shinyPurple 
                mb[-5px] shrink-0`}
                >
                    <span className=""></span> Answer Summary
                </span>
                {participants?.length && (
                    <span
                        onClick={() => setToShow("LD")}
                        className={`cursor-pointer px-3 py-3 text-[14px] isidoraBold 
                    rounded-[1px] border-shinyPurple 
                        mb[-5px] shrink-0   ${
                            toShow === "LD" && "border-b-[3px]"
                        } `}
                    >
                        <span className=""></span> Leaderboard
                    </span>
                )}
            </div>
        </div>
    );
};

export default QAandLDNav;
