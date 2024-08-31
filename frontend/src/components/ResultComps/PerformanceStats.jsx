const PerformanceStats = ({ data, getAllCorAndInCor }) => {
    return (
        <div className="flex pb-2 px-2 w-full gap-2">
            {/* Correct */}
            <div
                className=" bg-green-700 p-3 text-white flex-1 rounded 
            isidoraBold relative overflow-hidden z-10"
            >
                <h2 className="text-5xl">{getAllCorAndInCor(true)}</h2>
                <span className="text-white">correct</span>
                <div
                    className="rounded-full absolute bottom-[-12px] right-[-12px]
                 bg-green-700 w-16 h-16 flex justify-center items-center
                  opacity-[0.4] -z-10 border-[5px]"
                >
                    <span className="bi-check text-white text-5xl"></span>
                </div>
            </div>
            {/* Incorrect */}
            <div
                className=" bg-red-700 p-3 text-white flex-1 rounded 
            isidoraBold relative overflow-hidden z-10"
            >
                <h2 className="text-5xl">{getAllCorAndInCor(false)}</h2>
                <span className="text-white">incorrect</span>
                <div
                    className="rounded-full absolute bottom-[-12px] right-[-12px]
                 bg-red-700 w-16 h-16 flex justify-center items-center 
                 opacity-[0.4] -z-10 border-[5px]"
                >
                    <span className="bi-x text-white text-5xl"></span>
                </div>
            </div>
            {/* Rank */}
            <div
                className="bg-yellow-600  p-3 text-white flex-1 
            rounded isidoraBold relative overflow-hidden z-10"
            >
                <h2 className="text-5xl">{data?.points}</h2>
                <span className="text-white">Points</span>
                <div
                    className="rounded-full absolute bottom-[-12px] right-[-12px]
                 bg-yellow-600 w-16 h-16 flex justify-center items-center
                  opacity-[0.4] -z-10 border-[5px]"
                >
                    <span className="bi-star text-white text-5xl"></span>
                </div>
            </div>
        </div>
    );
};

export default PerformanceStats;
