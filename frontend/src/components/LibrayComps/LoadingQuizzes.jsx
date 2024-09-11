const LoadingQuizzes = ({ length = 6, edit }) => {
    return (
        <>
            {Array.from({ length }).map((ske, index) => {
                return (
                    <div
                        key={index}
                        className={`flex items-center gap-2 ${edit}`}
                    >
                        {/* image */}
                        <div className="skeleton w-16 h-16  rounded"></div>
                        <div className="flex flex-col gap-2">
                            <span className="skeleton w-24 h-3"></span>
                            <span className="skeleton w-40 h-3"></span>
                            <span className="skeleton w-16 h-3"></span>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default LoadingQuizzes;
