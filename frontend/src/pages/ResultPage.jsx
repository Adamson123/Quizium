import { useNavigate, useParams } from "react-router";
import IndQuizInfo from "../components/ResultComps/IndQuizInfo";
import NavRight from "../components/ResultComps/NavRight";
import PerformanceStats from "../components/ResultComps/PerformanceStats";
import ResultRatio from "../components/ResultComps/ResultRatio";
import Title from "../components/ResultComps/Title";
import { useQuery } from "react-query";
import { getSingleResult } from "../api/ResultApi";
import PageIsLoading from "../components/ui/PageIsLoading";
import QuestionsAnswered from "../components/ResultComps/QuestionsAnswered";

const ResultPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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

    if (!data && isLoading) {
        return <PageIsLoading message={"Loading result..."} />;
    }

    if (error) {
        toast.error(error.err);
        return navigate("/");
    }

    return (
        <div
            className="pt-[65px]
            md:pl-[180px] text-textColor flex flex-col w-full
            slg:flex-row min-h-screen bg-secMainBg md:max-h-screen md:overflow-hidden"
        >
            {/* Left */}
            <div
                className="flex flex-col slg:w-[50%]
                h-full pb-2 bg-[rgba(0,0,0,0.3)] slg:bg-transparent"
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
            <div className="px-2 slg:w-[50%]">
                <NavRight />
                <QuestionsAnswered results={data?.results} />
            </div>
        </div>
    );
};

export default ResultPage;
