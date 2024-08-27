const NavRight = () => {
    return (
        <div
            className="flex justify-start gap-5 md:gap-8
    text-[13px] mb-[-3px] overflow-x-auto scrollbar"
        >
            <span
                className={`cursor-pointer px-3 py-3 text-[14px] isidoraBold 
               border-b-[3px] rounded-[1px] border-shinyPurple 
                mb[-5px] shrink-0`}
            >
                <span className=""></span> Questions
            </span>
            <span
                className={`cursor-pointer px-3 py-3 text-[14px] isidoraBold 
              rounded-[1px] border-shinyPurple 
                mb[-5px] shrink-0`}
            >
                <span className=""></span> Leaderboard
            </span>
        </div>
    );
};

export default NavRight;
