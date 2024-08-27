const Explanation = ({ explanation }) => {
    return (
        <div
            className="absolute top-[0px] right-0 left-0 
        bottom-[-20px] bg-secMainBg text-center flex flex-col
        justify-center items-center p-2 px-10"
        >
            <div className="text-[14px] isidoraSemiBold">{explanation}</div>
            {/* <button
                onClick={() => {
                    // setShowExplanation(false);
                    // if (currentQuestion < allQuestions.length - 1) {
                    //     setCurrentQuestion(currentQuestion + 1);
                    // }
                }}
                className="bg-shinyPurple py-2 px-5 rounded isidoraBold
                 insetShadow text-[13px] clickable"
            >
                Continue
            </button> */}
        </div>
    );
};

export default Explanation;
