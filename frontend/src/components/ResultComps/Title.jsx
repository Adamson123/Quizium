const Title = ({ data }) => {
    return (
        <div
            className="px-3 py-3
     flex justify-between items-center"
        >
            <div>
                <h1 className="text-3xl isidoraBold">{data?.title}</h1>
                <span className="text-[13px] text-white isidoraBold">
                    Result
                </span>
            </div>
            <button
                className="flex mb-4 pr-3 bg-grayOne py-1 pl-3
             rounded insetShadow"
            >
                <span className="bi-share-fill"></span>
            </button>
        </div>
    );
};

export default Title;
