import alarmImg from "../../assets/images/alarm.png";

const TimeUp = ({ timeUp, resultId, navigate }) => {
    return (
        <div
            className={`popBlock bg-transparentBlack flex 
    items-center justify-center flex-col scaleUp z-20 ${
        timeUp ? "scale-1" : "scale-0"
    }`}
        >
            <h2 className="text-5xl isidoraBold">Time Up</h2>
            <div className="w-full h-80 max-w-[300px]">
                <img src={alarmImg} alt="quiz time up image" />
            </div>
            <button
                onClick={() => {
                    navigate("/result/" + resultId.current);
                }}
                className="py-2 px-5 bg-shinyPurple isidoraBold 
            rounded insetShadow clickable"
            >
                Continue
            </button>
        </div>
    );
};

export default TimeUp;
