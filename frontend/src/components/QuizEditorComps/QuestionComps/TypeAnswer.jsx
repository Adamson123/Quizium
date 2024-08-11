import { useEffect, useRef } from "react";
import Warning from "../../ui/Warning";

const TypeAnswer = ({
    singleQuestion,
    currentQuestion,
    allQuestions,
    allQuestions_2,
    setAllQuestions,
}) => {
    const acceptedAns = useRef([]);

    useEffect(() => {
        //adding text to typeAnswer divs , and will on be updated if question is updated in server
        if (
            singleQuestion.questionType === "typeAnswer" &&
            allQuestions_2 === allQuestions
        ) {
            acceptedAns.current.forEach((_, i) => {
                acceptedAns.current[i].innerText = singleQuestion.answer[i]
                    ? singleQuestion.answer[i]
                    : "";
            });
        }
    }, [singleQuestion, currentQuestion]);

    const updateAnswerForTypeAnswer = (event, index) => {
        //update answer with the index that mathes the passed down index
        const updateAnswer = singleQuestion.answer.map((ans, i) => {
            return i === index ? event.target.innerText : ans;
        });

        const updatedSingleQuestion = {
            ...singleQuestion,
            answer:
                //only add new data if  answer.length is less than index passed down else update the answer
                singleQuestion.answer.length - 1 < index
                    ? [...singleQuestion.answer, event.target.innerText]
                    : updateAnswer,
        };

        const updatedMultipleQuestion = allQuestions.map((q, i) => {
            return i !== currentQuestion ? q : updatedSingleQuestion;
        });

        setAllQuestions(updatedMultipleQuestion);
    };

    const checkEmptyAnswer = () => {
        //get non-empty answer field
        const emptyAnsField = singleQuestion.answer.filter((i) => {
            return i.trim(" ") !== "";
        });

        return emptyAnsField.length;
    };
    return Array.from({ length: 3 }, (_, i) => {
        return (
            <div key={i}>
                {i === 1 && (
                    <div className="px-4 py-2 bg-grayTwo text-center text-[12px] mb-4">
                        {" "}
                        Other Valid Answers{" "}
                    </div>
                )}

                <div className="relative">
                    {!checkEmptyAnswer() && (
                        <Warning text={"Fill Atleast one answer field"} />
                    )}
                    <div
                        className="p-2 text-[15px] w-full text-center 
              outline-none rounded text-white py-5 border border-grayOne"
                        data-placeholder="Enter Answer..."
                        contentEditable="true"
                        ref={(el) => {
                            acceptedAns.current[i] = el;
                        }}
                        onInput={(event) => updateAnswerForTypeAnswer(event, i)}
                    ></div>
                </div>
            </div>
        );
    });
};

export default TypeAnswer;
