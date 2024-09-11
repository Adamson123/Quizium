import { useEffect, useState } from "react";
import TitleAndGeneralInfo from "../components/HostReportComps/TitleAndGeneralInfo";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import { getHost } from "../api/HostApi";
import QAandLDNav from "../components/HostReportComps/QAandLDNav";
import ResAnswerSummary from "../components/HostReportComps/ResAnswerSummary";
import ResLeaderboard from "../components/HostReportComps/ResLeaderboard";
import SearchTrigger from "../components/SearchTrigger";

const HostReportPage = () => {
    const { id } = useParams();
    const { data } = useQuery(
        ["host-report"],
        () => getHost({ id: id, joinCode: 0 }),
        {
            retry: false,
        }
    );

    const [userResult, setUserResult] = useState([]);
    const [userId, setUserId] = useState("");
    //LD means leaderboard and QA means Answer Summary for some reasons
    const [toShow, setToShow] = useState("LD");

    useEffect(() => {
        if (data) {
            if (data?.hostInfo.participantsResults?.length) {
                const sorted = data?.hostInfo.participants?.sort((a, b) => {
                    return b.points - a.points;
                })[0];

                const getNumOne = data?.hostInfo.participantsResults.find(
                    (par) => {
                        return par.userId === sorted.userId;
                    }
                );

                /*will get the first result according to the order of the leaderboard*/

                setUserResult(
                    //data?.hostInfo.participantsResults[0].result.results
                    getNumOne.result.results
                );

                console.log(sorted, "sorted");

                setUserId(
                    //data?.hostInfo.participantsResults[0]
                    getNumOne?.userId
                );
            }
        }
    }, [data]);

    useEffect(() => {
        if (userId) {
            const userResult = data?.hostInfo.participantsResults.find(
                (res) => {
                    return res.userId === userId;
                }
            );
            setUserResult(userResult?.result.results);
        }
    }, [userId]);

    const getUserResult = (id) => {
        setUserId(id);
    };
    const getUserName = () => {
        const userInfo = data?.hostInfo.participants.find((res) => {
            return res.userId === userId;
        });

        return userInfo;
    };

    return (
        <div
            className={`p-3 pt-[77px] md:px-5 md:pt-[85px]
             md:pl-[200px] text-textColor flex flex-col w-full
            bg-secMainBg gap-5 md:h-screen md:max-h-screen 
            md:overflow-hidden md:pb-[170px]`}
        >
            <SearchTrigger/>
            {/* Title and general info */}
            <TitleAndGeneralInfo hostInfo={data?.hostInfo} />

            {/* Leaderboard and one participant  Answer Summary*/}
            <div
                className="rounded flex flex-col
             md:flex-row md:gap-5 pb-5 h-full"
            >
                <QAandLDNav
                    setToShow={setToShow}
                    toShow={toShow}
                    getUserName={getUserName}
                />

                <ResLeaderboard
                    getUserResult={getUserResult}
                    toShow={toShow}
                    userId={userId}
                    data={data}
                />
                <ResAnswerSummary
                    toShow={toShow}
                    userResult={userResult}
                    getUserName={getUserName}
                />
            </div>
        </div>
    );
};

export default HostReportPage;
