import ResultRect from "./ResultRect";

const AnswerSummary = ({ results, style, edit }) => {
    return (
        <div
            style={style}
            className={`flex flex-col gap-2 text-[13px]
            md:overflow-x-auto
            md:overflow-y-auto
            overflow-x-hidden h-full ${edit}`}
        >
            {results &&
                results?.map((res, index) => {
                    return <ResultRect key={index} result={res} />;
                })}
        </div>
    );
};

export default AnswerSummary;
