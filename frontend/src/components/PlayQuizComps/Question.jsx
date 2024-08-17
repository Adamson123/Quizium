import { useState } from "react";
import quizium from "../../assets/images/defaultCover/quizium-4.webp";
import Options from "./QuestionComps/Options";
import bufferToObjUrl from "../../utils/bufferToObjUrl";
import TypeAnswer from "./QuestionComps/TypeAnswer";
const Question = ({
    singleQuestion,
    allQuizResults,
    setAllQuizResults,
    currentQuestion,
}) => {
    console.log(singleQuestion);

    const { question, options } = singleQuestion;
    return (
        <div
            className="flex flex-col m-auto
        px-5 gap-5 w-full smd:max-w-[580px] lg:max-w-[570px]"
        >
            <div className="w-full">
                <h2 className="text-[18px] isidoraBold text-center">
                    {question}
                </h2>
            </div>
            {singleQuestion.image && (
                <div className="w-full h-[280px] shadow">
                    <img
                        src={bufferToObjUrl(
                            singleQuestion.image.image.data.data
                        )}
                        className="w-full h-full rounded object-cover"
                        alt=""
                    />
                </div>
            )}
            {singleQuestion.questionType === "quiz" ? (
                <Options
                    options={options}
                    allQuizResults={allQuizResults}
                    setAllQuizResults={setAllQuizResults}
                    singleQuestion={singleQuestion}
                    currentQuestion={currentQuestion}
                />
            ) : (
                <TypeAnswer />
            )}
        </div>
    );
};

export default Question;
