import audioSrc from "../../assets/audios/audio3.mp3";
import { useEffect, useMemo, useRef, useState } from "react";
import QuestionsNav from "./QuestionsNav";
const Header = ({ questionsAmount, currentQuestion, setCurrentQuestion }) => {
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

    return (
        <div className="py-3 px-5 w-full  bg-secMainBg relative">
            <div className="flex justify-between w-full gap-2 items-center flex-col">
                <div className="flex items-center mb-2 w-full justify-between">
                    {/* Live or Solo quiz */}
                    <div className="agbalumoFont">
                        <h2 className="text-[25px] text-shinyPurple">Qz.</h2>
                    </div>

                    <div className="">
                        <h2 className="text-[16px] isidoraSemiBold">
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

                <div className="w-full flex items-center justify-center relative">
                    <progress
                        className="progress progress-primary
                      progressBar w-full md:max-w-[550px] h-3"
                        value={35}
                        max={100}
                    ></progress>
                </div>
                <div className="flex justify-center w-full mt-3  md:max-w-[550px] pl-2">
                    {/* <h2 className="relative isidoraBold text-[15px]">
                        <span className="text-shinyPurple absolute -left-2 -top-1">
                            2
                        </span>
                        /<span>10</span>
                    </h2> 
                    ["bg-red-500", "bg-green-500", "bg-grayOne"]
                    */}
                </div>
                <QuestionsNav
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                    questionsAmount={questionsAmount}
                />
            </div>
        </div>
    );
};

export default Header;
