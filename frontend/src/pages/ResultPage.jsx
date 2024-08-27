import { useParams } from "react-router";
import IndQuizInfo from "../components/ResultComps/IndQuizInfo";
import NavRight from "../components/ResultComps/NavRight";
import PerformanceStats from "../components/ResultComps/PerformanceStats";
import ResultRatio from "../components/ResultComps/ResultRatio";
import Title from "../components/ResultComps/Title";
import { useQuery } from "react-query";
import { getSingleResult } from "../api/ResultApi";

const ResultPage = () => {
    const { id } = useParams();
    const { data, isLoading, error, refetch } = useQuery(
        ["quiz-questions", id],
        () => getSingleResult(id),
        {
            retry: false,
        }
    );

    const getAllCorAndInCor = (para) => {
        const results = data?.results.filter((res) => {
            return res.correct === para;
        });

        return results?.length;
    };
    console.log(data);

    return (
        <div
            className="bg-secMainBg pt-[65px]
            md:pl-[180px] text-textColor flex flex-col w-full
            md:flex-row min-h-screen"
        >
            {/* Left */}
            <div
                className="flex flex-col md:w-[50%]
                h-full pb-2"
            >
                {/* Title */}
                <Title data={data} />
                {/* Result and commentry */}
                <ResultRatio
                    data={data}
                    getAllCorAndInCor={getAllCorAndInCor}
                />
                {/* Correct , Incorrect , Position */}
                <PerformanceStats
                    data={data}
                    getAllCorAndInCor={getAllCorAndInCor}
                />

                <IndQuizInfo data={data} />
            </div>

            {/* Right */}
            <div className="px-2">
                <NavRight />
            </div>
        </div>
    );
};

export default ResultPage;
