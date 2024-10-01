import { useNavigate } from "react-router";
import convtToSimpleDate from "../../utils/convtToSimpleDate";
import { useMutation } from "react-query";
import { deleteResult } from "../../api/ResultApi";
import shortenText from "../../utils/shortenText";
import toast from "react-hot-toast";
import { deleteHost } from "../../api/HostApi";

const ReportsRect = ({
    report,
    reportIndex,
    index,
    setReportIndex,
    setShowShare,
    reportsToShow,
    refetchPlayed,
    refetchHosted,
}) => {
    const { mutateAsync: deleteResultFunc, isLoading: deletingResult } =
        useMutation(deleteResult);
    const { mutateAsync: deleteHostFunc, isLoading: deletingHost } =
        useMutation(deleteHost);

    const navigate = useNavigate();
    const handleDeleteResult = async () => {
        setReportIndex(-1);
        if (deletingResult) {
            return;
        }

        const promise = deleteResultFunc(report._id);
        toast.promise(promise, {
            loading: "Deleting result",
            success: (data) => {
                return data.msg;
            },
            error: (data) => {
                return data.err;
            },
        });
        const res = await promise;
        //setReports(res.results);
       
        refetchPlayed();
    };

    const handleDeleteHost = async () => {
        setReportIndex(-1);
        if (deletingHost) {
            return;
        }

        const promise = deleteHostFunc(report._id);
        toast.promise(promise, {
            loading: "Deleting Host",
            success: (data) => {
                return data.msg;
            },
            error: (data) => {
                return data.err;
            },
        });
        const res = await promise;
        //setReports(res.results);
        
        refetchHosted();
    };

    const getUrl = (addL) => {
        const location = addL ? window.location.origin : "";
        const id = report._id;
        const path =
            reportsToShow === "played"
                ? "result"
                : report.ended
                ? "host-report"
                : "host-live";
        return `${location}/${path}/${id}`;
    };

    const reportStateToShow = () => {
        if (reportsToShow === "played") {
            return (
                <span
                    className={`bi-circle-fill  ${
                        report?.quizType === "solo"
                            ? "text-yellow-500"
                            : "text-red-500"
                    } text-[8px] gap-1 flex items-center`}
                >
                    <span className="text-white text-[10px]">
                        {" "}
                        {report?.quizType === "solo" ? "Solo" : "Live"}
                    </span>
                </span>
            );
        } else {
            return (
                <span
                    className={`bi-circle-fill  ${
                        report?.ended ? "text-red-500" : "text-green-500"
                    } text-[8px] gap-1 flex items-center`}
                >
                    <span className="text-white text-[10px]">
                        {" "}
                        {report?.ended ? "Ended" : "Active"}
                    </span>
                </span>
            );
        }
    };
    const conditionForMenu = () => {
        const menu = reportsToShow === "hosted" ? report.ended : true;
        return menu;
    };

    return (
        <div
            onClick={() => navigate(getUrl())}
            className="bg-mainBg w-full py-3 px-4 
        flex items-center gap-5 cursor-pointer relative"
        >
            {/*Type */}

            <span
                className="bg-[rgba(0,0,0,0.31)] p-1 px-2 rounded
             isidoraSemiBold flex items-center"
            >
                {reportStateToShow()}
            </span>
            {/* Other infos */}
            <div className="flex justify-between w-full">
                <div className="flex flex-col">
                    {/* Name */}
                    <h2 className="isidoraBold">
                        {" "}
                        {
                            /* Title for small screen */
                            <span className="slg:hidden">
                                {shortenText(report.title, 28)}
                            </span>
                        }
                        {
                            /* Title for big screen */
                            <span className="hidden slg:block">
                                {report.title}
                            </span>
                        }
                    </h2>
                    <span className="isidoraSemiBold text-[11px] text-grayFive">
                        {reportsToShow === "played" ? "Played on" : "Hosted on"}{" "}
                        {convtToSimpleDate(report.createdAt)}
                    </span>
                </div>
                {/* Three dots and menu*/}
                {conditionForMenu() && (
                    <div>
                        <span
                            onClick={(event) => {
                                event.stopPropagation();
                                setReportIndex(
                                    reportIndex !== index ? index : -1
                                );
                            }}
                            style={{
                                transition: "background 0.4s ease-in-out",
                            }}
                            className="py-2 px-3 hover:bg-[rgba(0,0,0,0.3)] 
                        rounded-full cursor-pointer text-right absolute right-2"
                        >
                            <span className="bi-three-dots-vertical text-[15px]"></span>
                        </span>
                        {/* Menu */}
                        {reportIndex === index && (
                            <div
                                onClick={(event) => {
                                    event.stopPropagation();
                                    // setQuizIndex(index);
                                }}
                                className="absolute right-4
                        top-10 shadow-md p-4 isidoraSemiBold
                        flex flex-col gap-5 bg-mainBg z-10 shadowAround w-36"
                            >
                                <p
                                    onClick={
                                        reportsToShow === "played"
                                            ? handleDeleteResult
                                            : handleDeleteHost
                                    }
                                    className="flex items-center gap-4 hover:text-shinyPurple"
                                >
                                    <span className="bi-trash-fill"></span>
                                    <span className="text-[14px]">Delete</span>
                                </p>

                                {
                                    <p
                                        onClick={() => {
                                            setReportIndex(-1);
                                            setShowShare({
                                                open: true,
                                                url: getUrl(true),
                                            });
                                        }}
                                        className="flex items-center gap-4 hover:text-shinyPurple"
                                    >
                                        <span className="bi-share-fill"></span>
                                        <span className="text-[14px]">
                                            Share
                                        </span>
                                    </p>
                                }
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportsRect;
