const ReportsNav = ({ setReportsToShow, reportsToShow }) => {
    return (
        <div className="border-b-[2px] border-mainBg w-full">
            <div
                className="flex justify-start gap-5 md:gap-8
     text-[13px] mb-[-3px] overflow-x-auto scrollbar"
            >
                <span
                    onClick={() => setReportsToShow("played")}
                    className={`cursor-pointer px-3 py-3 text-[14px] isidoraBold 
                     ${
                         reportsToShow === "played" && "border-b-[3px]"
                     } rounded-[1px] border-shinyPurple 
                         mb[-5px] shrink-0`}
                >
                    <span className="">Played</span>
                </span>
                <span
                    onClick={() => setReportsToShow("hosted")}
                    className={`cursor-pointer px-3 py-3 text-[14px] isidoraBold 
                      rounded-[1px] border-shinyPurple 
                      mb[-5px] shrink-0   ${
                          reportsToShow === "hosted" && "border-b-[3px]"
                      }`}
                >
                    <span className=""></span>Hosted
                </span>
            </div>
        </div>
    );
};

export default ReportsNav;
