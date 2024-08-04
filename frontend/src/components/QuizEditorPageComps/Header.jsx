import React from "react";
import { useNavigate } from "react-router";
import Loading from "../ui/Loading";

const Header = ({
    setShow,
    setShowRightSect,
    handleUpdateQuiz,
    allQuestions,
    allQuestions_2,
    updatingQuest,
    showSaveNoti,
}) => {
    const navigate = useNavigate();
    return (
        <div
            className="p-3 bg-mainBg flex justify-between fixed right-0 left-0 
         top-0 z-20 topNavShadow items-center
         "
        >
            <h1
                onClick={() => {
                    navigate("/");
                }}
                className="font-bold
          text-shinyPurple agbalumoFont tracking-tighter text-3xl cursor-pointer"
            >
                Qz.
            </h1>
            {/* quiz settings , save button , change question type*/}
            <div className="flex items-center gap-3">
                {/* quiz settings*/}
                <div
                    onClick={() => setShow((s) => (s = true))}
                    className="border border-grayOne p-[3px] pl-2 rounded 
          flex items-center gap-2 cursor-pointer"
                >
                    <span className="isidoraBold text-[13px]">
                        Quiz settings
                    </span>
                    <button className="bg-grayTwo py-1 px-2 rounded">
                        <span className="bi-gear-fill"></span>
                    </button>
                </div>
                <div className="relative">
                    <button
                        onClick={handleUpdateQuiz}
                        className={`${
                            allQuestions !== allQuestions_2
                                ? "bg-red-600 clickable"
                                : "bg-grayTwo"
                        } insetShadow rounded text-[10px] 
                    h-[38px] w-[38px] box-border relative`}
                    >
                        {updatingQuest ? (
                            <Loading />
                        ) : (
                            <span className="bi-check text-2xl font-bold"></span>
                        )}
                    </button>
                    {allQuestions !== allQuestions_2 && showSaveNoti && (
                        /* Save changes notification */
                        <>
                            <span
                                className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px]
                    border-r-transparent border-b-[10px] border-red-600 shadow-md absolute bottom-[-23px] left-[19px] "
                            ></span>
                            <span
                                className="absolute bottom-[-45px] left-[-45px] 
                    w-[145px] bg-red-600 py-1 px-2 text-[12px] rounded shadow-md text-center"
                            >
                                Click to save changes
                            </span>
                        </>
                    )}
                </div>

                {/* question type */}
                <button
                    onClick={() => setShowRightSect((s) => (s = !s))}
                    className="p-[7px] slg:hidden clickable font-bold px-4 relative isidoraBold bg-shinyPurple insetShadow rounded"
                >
                    <span className="bi-chat text-1xl"></span>
                    <span className="bi-question absolute left-[16px]"></span>
                </button>
                {/* save button*/}
                <button className="p-[7px] clickable isidoraBold bg-shinyPurple insetShadow rounded">
                    Done
                </button>
            </div>
        </div>
    );
};

export default Header;
