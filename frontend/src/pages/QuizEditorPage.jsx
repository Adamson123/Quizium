import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import { getQuizWithQuestions } from "../api/QuizApi";
import { useMutation, useQuery } from "react-query";
import {
    createQuestion,
    deleteQuestion,
    updateQuestion,
} from "../api/QuestionApi";
import QuizSettings from "../components/QuizSettings";

import PageIsLoading from "../components/ui/PageIsLoading";
import Header from "../components/QuizEditorPageComps/Header";
import QuizzesMenu from "../components/QuizEditorPageComps/QuestionsMenu";
import RightSection from "../components/QuizEditorPageComps/RightSection";
import Question from "../components/QuizEditorPageComps/Question";
import toast from "react-hot-toast";
import QuizValidation from "../components/QuizEditorPageComps/QuizValidation";
import SaveOptions from "../components/QuizEditorPageComps/SaveOptions";

const QuizEditorPage = () => {
    const { id } = useParams();
    const { data, isLoading, error, refetch } = useQuery(
        ["quiz-questions", id],
        () => getQuizWithQuestions(id),
        {
            retry: false,
        }
    );

    const { mutateAsync: createQuestionFunc } = useMutation(createQuestion);
    const { mutateAsync: updateQuestionFunc, isLoading: updatingQuest } =
        useMutation(updateQuestion);
    const { mutateAsync: deleteQuestionFunc, isLoading: deletingQuest } =
        useMutation(deleteQuestion);

    //all quiz questions
    const [allQuestions, setAllQuestions] = useState([]);
    const [allQuestions_2, setAllQuestions_2] = useState([]);

    //new data to be sent
    const [singleQuestion, setSingleQuestion] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showQuizPanel, setShowQuizPanel] = useState(false);

    const [imagePicked, setPickedImage] = useState();
    const [showRightSect, setShowRightSect] = useState(false);
    const [showSaveNoti, setShowSaveNoti] = useState(false);
    const [showQuizValid, setShowQuizValid] = useState(false);
    const [showSaveOption, setShowSaveOption] = useState(false);
    const config = useMemo(() => {
        if (data) {
            return {
                title: data.title,
                description: data.description,
                timeLimit: data.timeLimit,
                applyTime: data.applyTime,
                visibility: data.visibility,
                category: data.category,
                coverImg: data.coverImg,
                draft: data.draft,
                id: data._id,
            };
        }
    }, [data]);

    //updating all questions array if questions has been fetched
    useEffect(() => {
        if (data) {
            setAllQuestions(data.questionsId.questions);
            setAllQuestions_2(data.questionsId.questions);
        }
    }, [data]);

    //updating single questions array if allQuestions array has been populated or if currentQuestion changes
    useEffect(() => {
        if (allQuestions) {
            setSingleQuestion((q) => (q = allQuestions[currentQuestion]));
        }
    }, [allQuestions, currentQuestion]);

    const handleCreateQuiz = async (quiz, image, duplicate) => {
        const quizInfo = quiz
            ? quiz
            : {
                  question: "",
                  answer: "",
                  explanation: "",
                  options: [
                      {
                          text: "",
                          isCorrect: false,
                      },
                      {
                          text: "",
                          isCorrect: false,
                      },
                      {
                          text: "",
                          isCorrect: false,
                      },
                      {
                          text: "",
                          isCorrect: false,
                      },
                  ],
                  questionType: "quiz",
                  answerOption: "singleAnswer",
                  answer: [],
              };
        const formData = new FormData();
        formData.append("question", JSON.stringify(quizInfo));
        formData.append("file", image);

        const info = {
            data: formData,
            id,
        };
        const promise = createQuestionFunc(info);

        toast.promise(promise, {
            loading: duplicate ? "Duplicating Question" : "Creating Question",
            success: (data) => {
                return duplicate ? "Question Duplicated" : data.msg;
            },
            error: (data) => {
                return data.err;
            },
        });

        const res = await promise;
        setAllQuestions(res.quiz.questionsId.questions);
        setAllQuestions_2(res.quiz.questionsId.questions);
    };

    const handleUpdateQuiz = async () => {
        if (
            (allQuestions_2 !== allQuestions || imagePicked) &&
            !updatingQuest
        ) {
            const formData = new FormData();
            formData.append("file", imagePicked);
            formData.append("question", JSON.stringify(singleQuestion));

            const data = {
                data: formData,
                id,
            };

            const holdAllQuestions_2 = allQuestions_2;
            setAllQuestions_2(allQuestions);

            const res = await updateQuestionFunc(data);
            if (res.err) {
                setAllQuestions_2(holdAllQuestions_2);
                return toast.error("Error saving previous changes");
            }

            if (imagePicked) {
                setAllQuestions(res.quiz.questionsId.questions);
                setAllQuestions_2(res.quiz.questionsId.questions);
            }
            setShowSaveNoti(false);
            setPickedImage("");
        }
    };

    const handleDeleteQuiz = async (questId) => {
        if (deletingQuest) {
            return;
        }
        if (allQuestions.length === 1) {
            toast.error("Question can't be deleted");
            return;
        }
        const info = {
            id,
            data: {
                questId,
                image: singleQuestion.image?._id,
            },
        };

        const promise = deleteQuestionFunc(info);

        toast.promise(promise, {
            loading: questId ? "Deleting Question" : "Deleting Image",
            success: (data) => {
                return questId ? data.msg : "Image Deleted";
            },
            error: (data) => {
                return questId ? "Error deleting image" : data.err;
            },
        });

        const res = await promise;

        setAllQuestions(res.quiz.questionsId.questions);
        setAllQuestions_2(res.quiz.questionsId.questions);

        if (questId) {
            if (currentQuestion === allQuestions.length - 1) {
                setCurrentQuestion(currentQuestion - 1);
            }
        }
    };

    useEffect(() => {
        if (imagePicked) {
            handleUpdateQuiz();
        }
    }, [imagePicked]);

    useEffect(() => {
        const preventReload = (event) => {
            if (allQuestions !== allQuestions_2) {
                event.preventDefault();
                event.returnValue = "";
                setShowSaveNoti(true);
            }
        };
        window.addEventListener("beforeunload", preventReload);

        return () => {
            window.removeEventListener("beforeunload", preventReload);
        };
    });

    console.log("create question re-rendered");

    const analizeQuiz = () => {
        const errorMessage = (field, value, type) => {
            /*checking if the quiz with question type "quiz" 
            has more than 1 options that is not empty*/
            if (field === "options" && type === "quiz") {
                //filter out filled options
                const filteredOptions = value.filter((op) => {
                    return op.text !== "";
                });
                if (filteredOptions.length > 1) return "";
            }

            let filteredAnswers;
            if (field === "answer") {
                filteredAnswers = value.filter((op) => {
                    return op !== "";
                });
            }

            /*return if its options field and the type is not quiz 
            cause we are only validating options fields in quiz with questionType "quiz"
            or if field is question and the value is not empty or if field is answer 
            and the answer has valid element in it*/

            if (
                (field === "options" && type !== "quiz") ||
                (field === "question" && value) ||
                (field === "answer" && filteredAnswers.length)
            ) {
                return "";
            }

            const message = {
                question: "Question field is empty",
                options: "An option field is empty",
                answer: "Answer is empty",
            };

            return message[field];
        };

        let analizedQuestions = [];
        for (let index = 0; index < allQuestions.length; index++) {
            const question = allQuestions[index];
            const messages = {
                //question Error
                questionError: errorMessage(
                    "question",
                    question.question,
                    question.questionType
                ),
                //option Error
                optionsError: errorMessage(
                    "options",
                    question.options,
                    question.questionType
                ),
                //answer Error
                answerError: errorMessage(
                    "answer",
                    question.answer,
                    question.questionType
                ),
                index,
            };
            if (
                messages.questionError ||
                messages.optionsError ||
                messages.answerError
            ) {
                analizedQuestions = [...analizedQuestions, messages];
            }
        }
        if (!analizedQuestions.length) {
            return;
        }
        return analizedQuestions;
    };

    if (!data) {
        return <PageIsLoading message={"Setting up quiz editor..."} />;
    }

    return (
        <div
            className={`isidoraReg ${
                showQuizPanel ||
                showSaveOption ||
                (showQuizValid && "overflow-hidden")
            } bg-mainBg text-textColor`}
        >
            {/* Header */}

            <Header
                setShow={setShowQuizPanel}
                setShowRightSect={setShowRightSect}
                handleUpdateQuiz={handleUpdateQuiz}
                allQuestions={allQuestions}
                allQuestions_2={allQuestions_2}
                updatingQuest={updatingQuest}
                showSaveNoti={showSaveNoti}
                setShowSaveOption={setShowSaveOption}
            />

            {config && (
                <QuizSettings
                    config={config}
                    refetch={refetch}
                    id={id}
                    setShow={setShowQuizPanel}
                    show={showQuizPanel}
                />
            )}

            {/* Question , Right Section  , Quizzes Menu*/}

            <div
                className="min-h-screen pt-28 pb-32 px-7 slg:pr-[330px] 
            lg:pr-[300px] lg:pl-20 relative"
            >
                <SaveOptions
                    config={config}
                    showSaveOption={showSaveOption}
                    setShowSaveOption={setShowSaveOption}
                    setShowQuizValid={setShowQuizValid}
                    analizeQuiz={analizeQuiz}
                    refetch={refetch}
                />
                <QuizValidation
                    allQuestions={allQuestions}
                    showQuizValid={showQuizValid}
                    setShowQuizValid={setShowQuizValid}
                    setCurrentQuestion={setCurrentQuestion}
                    analizeQuiz={analizeQuiz}
                />
                {/*  Enter Question &  options container*/}
                {singleQuestion && (
                    <>
                        <Question
                            allQuestions={allQuestions}
                            setAllQuestions={setAllQuestions}
                            singleQuestion={singleQuestion}
                            currentQuestion={currentQuestion}
                            imagePicked={imagePicked}
                            setPickedImage={setPickedImage}
                            allQuestions_2={allQuestions_2}
                            handleDeleteQuiz={handleDeleteQuiz}
                        />
                        {/* right section( Answer Options , Quiz type , Delete )
                         */}
                        <RightSection
                            singleQuestion={singleQuestion}
                            setSingleQuestion={setSingleQuestion}
                            setAllQuestions={setAllQuestions}
                            allQuestions={allQuestions}
                            currentQuestion={currentQuestion}
                            handleUpdateQuiz={handleUpdateQuiz}
                            showRightSect={showRightSect}
                            setShowRightSect={setShowRightSect}
                            allQuestions_2={allQuestions_2}
                            handleDeleteQuiz={handleDeleteQuiz}
                            handleCreateQuiz={handleCreateQuiz}
                        />
                    </>
                )}
                {/* quizzes menu */}
                <QuizzesMenu
                    allQuestions={allQuestions}
                    imagePicked={imagePicked}
                    handleCreateQuiz={handleCreateQuiz}
                    handleUpdateQuiz={handleUpdateQuiz}
                    setCurrentQuestion={setCurrentQuestion}
                    currentQuestion={currentQuestion}
                    setAllQuestions={setAllQuestions}
                    singleQuestion={singleQuestion}
                    showQuizValid={showQuizValid}
                />
            </div>
        </div>
    );
};

export default QuizEditorPage;
