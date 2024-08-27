import shortenText from "../../utils/shortenText";

const IndQuizInfo = ({ data }) => {
    const avgTimgSpent = () => {
        const time = data?.entireTimeSpent;
        let minutes = Math.round(time / 60);
        let seconds = time % 60;
        let hour = Math.round(minutes / 60);
        let minute = minutes % 60;
        return {
            minutes,
            seconds,
            hour: time < 3600 ? 0 : hour,
            minute: time < 60 ? 0 : minute,
            time,
        };
        /*so besically if you are converting a time measurement to another measurement
         eg:second to minute and you still want to get the left out remainder
          to yourself,just do you yourself modulo 60 i mean if its 62 seconds to minute 
          and you still want to get the remainder,  just do 62 / 60 for minutes
          and 62 % 60 for the remainder,result will be 1 min 2 sec */
    };

    console.log(avgTimgSpent());
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
                        <span className="">
                            {avgTimgSpent().hour ? (
                                <span>{avgTimgSpent().hour} hour </span>
                            ) : (
                                ""
                            )}
                            {avgTimgSpent().minute ? (
                                <span>{avgTimgSpent().minute} min </span>
                            ) : (
                                ""
                            )}
                            {avgTimgSpent().seconds ? (
                                <span>{avgTimgSpent().seconds} sec </span>
                            ) : (
                                ""
                            )}
                        </span>
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
