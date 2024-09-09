import { useNavigate, useParams } from "react-router";
import OtherQuizInfo from "../components/ResultComps/OtherQuizInfo";
import QAandLDNav from "../components/ResultComps/QAandLDNav";
import PerformanceStats from "../components/ResultComps/PerformanceStats";
import ResultRatio from "../components/ResultComps/ResultRatio";
import Title from "../components/ResultComps/Title";
import { useQuery } from "react-query";
import { getSingleResult } from "../api/ResultApi";
import PageIsLoading from "../components/ui/PageIsLoading";
import AnswerSummary from "../components/ResultComps/AnswerSummary";
import toast from "react-hot-toast";
import Leaderboard from "../components/HostLiveComps/Leaderboard";
import { useState } from "react";

const ResultPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, error, refetch } = useQuery(
        ["quiz-result", id],
        () => getSingleResult(id),
        {
            retry: false,
        }
    );
    //LD means leaderboard and QA means Answer Summary for some reasons
    const [toShow, setToShow] = useState("QA");

    const getAllCorAndInCor = (para) => {
        const results = data?.results.filter((res) => {
            return res.correct === para;
        });

        return results?.length;
    };

    if (!data && isLoading) {
        return <PageIsLoading message={"Loading result..."} />;
    }

    if (error) {
        toast.error(error.err);
        return navigate("/");
    }

    return (
        <div
            className={`pt-[65px]
            md:pl-[180px] text-textColor flex flex-col w-full
            slg:flex-row min-h-screen 
            bg-secMainBg md:max-h-screen md:overflow-hidden ${
                toShow === "LD" && "pb-5"
            } md:pb-0`}
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

                <OtherQuizInfo data={data} />
            </div>

            {/* Right */}
            <div className="px-2 slg:w-[50%]">
                <QAandLDNav
                    toShow={toShow}
                    setToShow={setToShow}
                    participants={data?.hostInfos?.participants}
                />
                {toShow === "QA" ? (
                    <AnswerSummary
                        results={data?.results}
                        edit={"p-2 pb-16 md:max-h-screen"}
                    />
                ) : (
                    data?.hostInfos && (
                        <Leaderboard
                            showHeader={false}
                            participants={data?.hostInfos.participants}
                            edit={"mt-[6px]"}
                            style={{ background: "transparent" }}
                            rowEdit={`bg-transparentBlack w-full p-2 pr-3 pl-6 
                             rounded shadow-[rgba(0, 0, 0, 0.4)]`}
                            boardStyle={{
                                padding: "0px",
                                gap: "6px",
                            }}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default ResultPage;
