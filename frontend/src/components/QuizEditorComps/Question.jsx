import { memo, useEffect, useRef, useState } from "react";
import bufferToObjUrl from "../../utils/bufferToObjUrl";
import Warning from "../ui/Warning";
import { convertToWebp } from "../../utils/convertToWebp";
import Loading from "../ui/Loading";
import Options from "./QuestionComps/Options";
import TrueFalse from "./QuestionComps/TrueFalse";
import TypeAnswer from "./QuestionComps/TypeAnswer";
import Image from "./QuestionComps/Image";

const Question = memo(
    ({
        // allQuestions,
        // setAllQuestions,
        // singleQuestion,
        // currentQuestion,
        // imagePicked,
        // setPickedImage,
        // allQuestions_2,
        // handleDeleteQuiz,
        questionConfig,
    }) => {
        const {
            allQuestions,
            setAllQuestions,
            singleQuestion,
            currentQuestion,
            imagePicked,
            setPickedImage,
            allQuestions_2,
            handleDeleteQuiz,
        } = questionConfig;
        const questionRef = useRef("");

        const [questionText, setQuestionText] = useState(
            singleQuestion.question
        );
        const updateIsCorrect = useRef(false);
        // adding text to options if allQuestion array has been populated (it's latest version has been updated in the server)
        useEffect(() => {
            if (allQuestions_2 === allQuestions) {
                questionRef.current.innerText = singleQuestion.question;
                setQuestionText(singleQuestion.question);
            }
        }, [currentQuestion]);

        //will be called when user is typing...
        const updateQuestion = (event) => {
            const updatedSingleQuestion = {
                ...singleQuestion,
                question: event.target.innerText,
            };

            setQuestionText(event.target.innerText);

            const updatedMultipleQuestion = allQuestions.map((q, i) => {
                return i !== currentQuestion ? q : updatedSingleQuestion;
            });
            setAllQuestions(updatedMultipleQuestion);
        };

        //for updating answer , specifically for "quiz" and "trueFalse" type quizzes
        const updateAnswer = (event) => {
            //
            const modifyAnswerArray = () => {
                //remove the value (question id or true & false) if it is already part of the answer array
                if (singleQuestion.answer.includes(event.target.value)) {
                    return singleQuestion.answer.filter((a) => {
                        return a !== event.target.value;
                    });
                } else {
                    //else join it with other answers
                    return [...singleQuestion.answer, event.target.value];
                }
            };

            const updatedSingleQuestion = {
                ...singleQuestion,
                answer:
                    singleQuestion.answerOption === "singleAnswer"
                        ? [event.target.value]
                        : modifyAnswerArray(),
            };

            const updatedMultipleQuestion = allQuestions.map((q, i) => {
                return i !== currentQuestion ? q : updatedSingleQuestion;
            });

            setAllQuestions(updatedMultipleQuestion);
            updateIsCorrect.current = true;
        };

        //updating isCorrect only if updateIsCorrect.current is true
        useEffect(() => {
            if (updateIsCorrect.current) {
                const updatedOption = singleQuestion.options.map((opt) => {
                    return singleQuestion.answer.includes(opt._id)
                        ? { ...opt, isCorrect: true }
                        : { ...opt, isCorrect: false };
                });

                const updatedSingleQuestion = {
                    ...singleQuestion,
                    options: updatedOption,
                };

                const updatedMultipleQuestion = allQuestions.map((q, i) => {
                    return i !== currentQuestion ? q : updatedSingleQuestion;
                });

                setAllQuestions(updatedMultipleQuestion);
                updateIsCorrect.current = false;
            }
        }, [singleQuestion.answer]);

        const optionsToRender = () => {
            if (singleQuestion.questionType === "trueFalse") {
                return (
                    <TrueFalse
                        updateAnswer={updateAnswer}
                        singleQuestion={singleQuestion}
                    />
                );
            } else if (singleQuestion.questionType === "typeAnswer") {
                return (
                    <TypeAnswer
                        singleQuestion={singleQuestion}
                        currentQuestion={currentQuestion}
                        allQuestions={allQuestions}
                        allQuestions_2={allQuestions_2}
                        setAllQuestions={setAllQuestions}
                    />
                );
            } else {
                return (
                    <Options
                        updateAnswer={updateAnswer}
                        singleQuestion={singleQuestion}
                        setAllQuestions={setAllQuestions}
                        currentQuestion={currentQuestion}
                        allQuestions={allQuestions}
                        allQuestions_2={allQuestions_2}
                    />
                );
            }
        };

        return (
            <div className="w-full smd:max-w-[580px] lg:max-w-[570px] m-auto">
                {/*  Enter Question */}

                <div
                    className="bg-mainBg border border-grayOne rounded text-center
                         text-[15px] p-2 w-full h-auto text-wrap break-words flex
                        items-center justify-center relative mb-4"
                >
                    <div
                        onInput={updateQuestion}
                        className="w-full font-bold outline-none overflow-y-auto isidoraBold
                     max-h-full text-[18px]"
                        contentEditable
                        data-placeholder="Enter question..."
                        ref={questionRef}
                    />
                    {!questionText.trim(" ") && (
                        <Warning text={"Field should not be empty"} />
                    )}
                </div>
                {/* Upload Image */}
                <Image
                    singleQuestion={singleQuestion}
                    handleDeleteQuiz={handleDeleteQuiz}
                    imagePicked={imagePicked}
                    setPickedImage={setPickedImage}
                />
                {/*  Enter Options */}
                <div className="flex flex-col gap-4 mt-10">
                    {optionsToRender()}
                </div>
            </div>
        );
    }
);
export default Question;
