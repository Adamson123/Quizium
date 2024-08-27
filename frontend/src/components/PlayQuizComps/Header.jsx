import audioSrc from "../../assets/audios/audio3.mp3";
import { useEffect, useMemo, useRef, useState } from "react";
import QuestionsNav from "./HeaderComps/QuestionsNav";
import EntireTime from "./HeaderComps/EntireTime";
import { useNavigate } from "react-router";
import EachTime from "./HeaderComps/EachTime";
const Header = ({
    currentQuestion,
    setCurrentQuestion,
    allQuestions,
    findQuestionResult,
    timeLimit,
    questionNavRef,
    startQuiz,
    setStartQuiz,
    timeSpent,
    submitQuiz,
    setTimeUp,
    applyTime,
    singleQuestion,
    selectAnswer,
    allQuestionsResults,
}) => {
    const navigate = useNavigate();
    const quizAudio = useMemo(() => {
        const audio = new Audio(audioSrc);
        // audio.autoplay = true;
        return audio;
    }, []);

    const [play, setPlay] = useState(false);

    useEffect(() => {
        if (play) {
            quizAudio.play();
        } else {
            quizAudio.pause();
        }

        return () => {
            quizAudio.pause();
        };
    }, [play]);

    //to restart the audio
    useEffect(() => {
        const restartAudio = () => {
            if (quizAudio.currentTime >= quizAudio.duration && play) {
                // alert("restarting audio");
                quizAudio.currentTime = 0;
                quizAudio.play();
            }
        };
        quizAudio.addEventListener("timeupdate", restartAudio);

        return () => {
            quizAudio.removeEventListener("timeupdate", restartAudio);
        };
    });

    const getTwentyPercentage = (timeLimit, updatingTime) => {
        const twentyPercentage = timeLimit * 0.3;
        return twentyPercentage >= updatingTime;
    };

    return (
        <div className="py-2 px-5 w-full  bg-secMainBg relative">
            <div
                className="flex justify-between w-full gap-[10px]
             items-center flex-col"
            >
                <div className="flex items-center w-full justify-between">
                    {/* Live or Solo quiz */}
                    <div className="agbalumoFont">
                        <h2
                            onClick={() => navigate("/")}
                            className="text-[25px] text-shinyPurple cursor-pointer"
                        >
                            Qz.
                        </h2>
                    </div>

                    <div className="">
                        <h2 className="text-[15px] isidoraSemiBold">
                            Solo Quiz
                        </h2>
                    </div>
                    <div className="">
                        <button
                            onClick={() => setPlay(!play)}
                            className={`${
                                play
                                    ? "bg-[rgba(0,255,0,0.6)]"
                                    : "bg-[rgba(255,0,0,0.6)]"
                            } text-[20px] w-9 h-9
                        rounded-full flex justify-center insetShadow clickable`}
                        >
                            <span
                                className={` ${
                                    play
                                        ? "bi-volume-up-fill"
                                        : "bi-volume-mute-fill"
                                } mt-[1px]`}
                            ></span>
                        </button>
                    </div>
                </div>

                {applyTime === "entire" ? (
                    <EntireTime
                        timeLimit={timeLimit}
                        startQuiz={startQuiz}
                        setStartQuiz={setStartQuiz}
                        // setTimeSpent={setTimeSpent}
                        setTimeUp={setTimeUp}
                        timeSpent={timeSpent}
                        submitQuiz={submitQuiz}
                        getTwentyPercentage={getTwentyPercentage}
                        allQuestionsResults={allQuestionsResults}
                        allQuestions={allQuestions}
                    />
                ) : (
                    <EachTime
                        singleQuestion={singleQuestion}
                        startQuiz={startQuiz}
                        selectAnswer={selectAnswer}
                        findQuestionResult={findQuestionResult}
                        allQuestionsResults={allQuestionsResults}
                        timeSpent={timeSpent}
                        getTwentyPercentage={getTwentyPercentage}
                    />
                )}

                {applyTime === "entire" ? (
                    <QuestionsNav
                        currentQuestion={currentQuestion}
                        setCurrentQuestion={setCurrentQuestion}
                        allQuestions={allQuestions}
                        findQuestionResult={findQuestionResult}
                        questionNavRef={questionNavRef}
                    />
                ) : (
                    <div className="flex justify-center w-full  md:max-w-[550px] pl-2">
                        <h2 className="relative isidoraBold text-[15px]">
                            <span className="text-shinyPurple absolute -left-2 -top-1">
                                {currentQuestion + 1}
                            </span>
                            /<span>{allQuestions.length}</span>
                        </h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
