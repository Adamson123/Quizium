const PerformanceStats = ({ data, getAllCorAndInCor }) => {
    return (
        <div className="flex pb-2 px-2 w-full gap-2">
            {/* Correct */}
            <div
                className="bg-white p-3 text-black flex-1 rounded 
            isidoraBold relative overflow-hidden z-10"
            >
                <h2 className="text-5xl">{getAllCorAndInCor(true)}</h2>
                <span className="text-green-700">correct</span>
                <div
                    className="rounded-full absolute bottom-[-10px] right-[-10px]
                 bg-green-700 w-16 h-16 flex justify-center items-center
                  opacity-[0.7] -z-10"
                >
                    <span className="bi-check text-white text-6xl"></span>
                </div>
            </div>
            {/* Incorrect */}
            <div
                className="bg-white p-3 text-black flex-1 rounded 
            isidoraBold relative overflow-hidden z-10"
            >
                <h2 className="text-5xl">{getAllCorAndInCor(false)}</h2>
                <span className="text-red-700">incorrect</span>
                <div
                    className="rounded-full absolute bottom-[-10px] right-[-10px]
                 bg-red-700 w-16 h-16 flex justify-center items-center 
                 opacity-[0.7] -z-10"
                >
                    <span className="bi-x text-white text-6xl"></span>
                </div>
            </div>
            {/* Rank */}
            <div
                className="bg-white p-3 text-black flex-1 
            rounded isidoraBold relative overflow-hidden z-10"
            >
                <h2 className="text-5xl">
                    {data?.quizType === "solo" && "--"}
                </h2>
                <span className="text-yellow-700">Position</span>
                <div
                    className="rounded-full absolute bottom-[-10px] right-[-10px]
                 bg-yellow-700 w-16 h-16 flex justify-center items-center
                  opacity-[0.7] -z-10"
                >
                    <span className="bi-award text-white text-6xl"></span>
                </div>
            </div>
        </div>
    );
};

export default PerformanceStats;
