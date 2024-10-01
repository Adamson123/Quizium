import { useQuery } from "react-query";
import ReportsNav from "../components/ReportsComps/ReportsNav";
import ReportsRect from "../components/ReportsComps/ReportsRect";
import { getUserResults } from "../api/ResultApi";
import { useContext, useEffect, useState } from "react";
import Share from "../components/Share";
import { getUserHosts } from "../api/HostApi";
import { dataContext } from "../layouts/Layout";
import box from "../assets/svg/empty-box2.svg";
import searchSvg from "../assets/svg/search.svg";

const ReportsPage = () => {
  const {
    data: played,
    refetch: refetchPlayed,
    isLoading,
  } = useQuery(["played"], getUserResults, {
    retry: false,
  });
  const { data: hosted, refetch: refetchHosted } = useQuery(
    ["hosted"],
    getUserHosts,
    {
      retry: false,
    }
  );

  const [reports, setReports] = useState([]);
  const [reportIndex, setReportIndex] = useState(-1);
  const [showShare, setShowShare] = useState({ url: "", open: false });
  const [reportsToShow, setReportsToShow] = useState("played");
  const value = useContext(dataContext);

  useEffect(() => {
    if (played) {
      const showReports =
        reportsToShow === "played" ? played?.results : hosted?.hosts;

      const filteredReports = showReports?.filter((rep) => {
        return value?.search.trim(" ")
          ? rep.title.includes(value?.search)
          : rep;
      });
      setReports(filteredReports);
    }
  }, [played, hosted, reportsToShow, value?.search]);

  return (
    <div
      onClick={() => setReportIndex(-1)}
      className="min-h-screen bg-secMainBg pt-20 pb-28 px-5 
        md:pl-[210px] text-textColor flex flex-col"
    >
      <h1 className="text-2xl isidoraBold mb-6">Reports</h1>
      <div>
        <ReportsNav
          setReportsToShow={setReportsToShow}
          reportsToShow={reportsToShow}
        />
        {/* Reports */}
        {!isLoading ? (
          <div
            className="flex flex-col w-full mt-7 gap-[2px]
                    rounded relative"
          >
            {reports?.map((rep, index) => {
              return (
                <ReportsRect
                  key={index}
                  report={rep}
                  reportIndex={reportIndex}
                  setReportIndex={setReportIndex}
                  index={index}
                  setShowShare={setShowShare}
                  reportsToShow={reportsToShow}
                  refetchPlayed={refetchPlayed}
                  refetchHosted={refetchHosted}
                />
              );
            })}
          </div>
        ) : (
          <div
            className="flex flex-col w-full mt-7 gap-[2px]
                    rounded relative"
          >
            <div className="skeleton w-full h-[64.5px] rounded-none"></div>
            <div className="skeleton w-full h-[64.5px] rounded-none"></div>
            <div className="skeleton w-full h-[64.5px] rounded-none"></div>
            <div className="skeleton w-full h-[64.5px] rounded-none"></div>
          </div>
        )}

        {!isLoading && !reports?.length && (
          <div
            className="w-full h-64 flex justify-center
                     items-center m-auto relative bg-mainBg mt-7"
          >
            {value?.search && (
              <p
                className="isidoraSemiBold absolute
                             top-[-23px] left-0 text-[13px]"
              >
                {reports.length} results was found for "{value?.search}"
              </p>
            )}
            <img
              src={value?.search ? searchSvg : box}
              alt="signifies no report was found"
              className="h-40 w-40"
            />
          </div>
        )}
      </div>

      <Share setShowShare={setShowShare} showShare={showShare} />
    </div>
  );
};

export default ReportsPage;
