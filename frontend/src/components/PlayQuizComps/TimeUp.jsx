import alarmImg from "../../assets/images/alarm.png";
import disconnectImg from "../../assets/images/disconnect.svg";
const TimeUp = ({ timeUp, navigate, resultId, quizEndedRef }) => {
    return (
        <div
            className={`popBlock bg-transparentBlack flex 
    items-center justify-center flex-col scaleUp z-30 ${
        timeUp ? "scale-1" : "scale-0"
    } gap-5`}
        >
            <h2 className="text-5xl isidoraBold">
                {quizEndedRef.current ? "Quiz was ended" : "Time Up"}
            </h2>
            <div className="h-80">
                <img
                    src={quizEndedRef.current ? disconnectImg : alarmImg}
                    alt="quiz time up image"
                    className="w-full h-full object-cover"
                />
            </div>
            {resultId && (
                <button
                    onClick={() => {
                        history.replaceState(null, "", "/");
                        navigate("/result/" + resultId);
                    }}
                    className="py-2 px-5 bg-shinyPurple isidoraBold 
            rounded insetShadow clickable"
                >
                    Continue
                </button>
            )}
        </div>
    );
};

export default TimeUp;
