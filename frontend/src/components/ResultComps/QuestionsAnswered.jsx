import ResultRect from "./ResultRect";

const QuestionsAnswered = ({ results }) => {
    return (
        <div
            className="flex flex-col gap-2 text-[13px]
            p-2 md:overflow-x-auto
            md:max-h-screen md:overflow-y-auto overflow-x-hidden pb-16 h-full"
        >
            {results.map((res, index) => {
                return <ResultRect key={index} result={res} />;
            })}
        </div>
    );
};

export default QuestionsAnswered;
