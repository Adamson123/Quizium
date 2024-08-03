import Warning from "../ui/Warning";
const QuizzesMenu = ({
    allQuestions,
    imagePicked,
    handleCreateQuiz,
    handleUpdateQuiz,
    setCurrentQuestion,
    currentQuestion,
    singleQuestion,
}) => {
    const showWarning = (index) => {
        const singleQuestion_2 = allQuestions[index];
        let showWarning;

        const emptyOptions = singleQuestion_2.options.filter((i) => {
            return i.text.trim(" ") === "";
        });

        //answer contain non empty space
        const answerConNonEmpty = singleQuestion_2.answer.filter((i) => {
            return i.trim(" ") !== "";
        });

        if (!singleQuestion_2.question.trim(" ")) {
            showWarning = "Question field is empty";
            return showWarning;
        } else if (
            //only if the question type is quiz
            emptyOptions.length > 2 &&
            singleQuestion_2.questionType === "quiz"
        ) {
            showWarning = "Fill atleast 2 option field";
            return showWarning;
        } else if (
            !singleQuestion_2.answer.length ||
            (answerConNonEmpty.length < 1 &&
                singleQuestion_2.questionType === "typeAnswer")
        ) {
            showWarning = "Answer is empty";
            return showWarning;
        }

        return showWarning;
    };
    return (
        <div
            className="fixed overflow-x-auto bottom-0 right-0 left-0 bg-mainBg gap-2 
      flex p-2 slg:pr-10 slg:right-[350px] lg:top-0 lg:flex-col lg:w-36 lg:pt-20
      lg:overflow-y-auto items-center lg:overflow-x-hidden lg:px-5  sxl:w-44 outsetShadow"
        >
            {allQuestions &&
                allQuestions.map((q, i) => {
                    return (
                        <div
                            onClick={() => {
                                if (!imagePicked) {
                                    handleUpdateQuiz();
                                    setCurrentQuestion(i);
                                }
                            }}
                            key={i}
                            className={`min-h-16 min-w-24  border-2  ${
                                currentQuestion === i
                                    ? "border-shinyPurple text-shinyPurple"
                                    : "border-grayOne text-grayOne"
                            } 
                            cursor-pointer rounded text-center  flex 
                            justify-center items-center relative font-bold 
                            text-3xl md:min-w-24 md:min-h-20 sxl:min-w-28 ${
                                !imagePicked && "shinyShadow"
                            }`}
                        >
                            {i + 1}

                            {singleQuestion && showWarning(i) && (
                                <Warning text={showWarning(i)} />
                            )}
                        </div>
                    );
                })}
            <button
                className="p-2 h-10 w-10 bg-shinyPurple
       insetShadow text-2xl rounded flex justify-center items-center
        font-bold  lg:w-28 clickable"
                onClick={() => {
                    handleUpdateQuiz();
                    handleCreateQuiz();
                }}
            >
                <span className="text-[13px] hidden lg:block isidoraBold">
                    Add Question
                </span>
                <span className="bi-plus block lg:hidden"></span>
            </button>
            <span className="fixed h-24 w-6 right-[350px] bg-mainBg hidden slg:block lg:hidden"></span>
        </div>
    );
};

export default QuizzesMenu;
