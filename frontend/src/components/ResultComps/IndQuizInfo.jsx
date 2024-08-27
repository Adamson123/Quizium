import shortenText from "../../utils/shortenText";

const IndQuizInfo = ({ data }) => {
    return (
        <div
            className="flex 
    text-black w-full px-2 gap-2"
        >
            <div
                className="bg-[rgba(255,255,255)] px-3 py-3
            flex flex-col gap-5
            rounded w-[50%] text-black isidoraBold text-[11px] flex-1"
            >
                <div className="flex justify-between">
                    <span>Questions</span>
                    <span className="flex min-w-[70px] gap-2 text-left">
                        <span className="bi-patch-question-fill text-[#ec5ad9]"></span>
                        <span className="">{data?.questionsLength}</span>
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Total Answered</span>
                    <span className="flex min-w-[70px] gap-2 text-right">
                        <span className="bi-check-all text-[14px] text-green-500"></span>
                        <span className="">{data?.results.length}</span>
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Avg. Time</span>
                    <span className="flex min-w-[70px] gap-2 text-left">
                        <span className="bi-clock-fill text-blue-500"></span>
                        <span className="">15 min</span>
                    </span>
                </div>
                <div className="flex justify-between">
                    <span>Players</span>
                    <span className="flex min-w-[70px] gap-2 text-right">
                        <span className="bi-person-fill text-red-500"></span>
                        <span className="">17</span>
                    </span>
                </div>
            </div>

            <div
                className="py-3 
                flex flex-col gap-5 bg-white rounded w-[50%]
                 text-black isidoraBold text-[11px] flex-2"
            >
                <div className="pl-3 flex gap-2">
                    <span>Hosted by:</span>
                    <span className="">{shortenText("Aj breed", 18)}</span>
                </div>

                <div className="pl-3 flex gap-2">
                    <span>Started:</span>
                    <span className="">Feb 25 2026, 11:00am</span>
                </div>

                <div className="pl-3 flex gap-2">
                    <span>Ended:</span>
                    <span className=" ">Feb 25 2026, 12:00am</span>
                </div>
                <div className="pl-3 flex gap-2">
                    <span>Quiz type:</span>
                    <span className=" ">Live quiz</span>
                </div>
            </div>
        </div>
    );
};

export default IndQuizInfo;
