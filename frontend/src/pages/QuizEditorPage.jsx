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
import QuizzesMenu from "../components/QuizEditorPageComps/QuizzesMenu";
import RightSection from "../components/QuizEditorPageComps/RightSection";
import Question from "../components/QuizEditorPageComps/Question";
import toast from "react-hot-toast";
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
            console.log(currentQuestion);
            setSingleQuestion((q) => (q = allQuestions[currentQuestion]));
        }
    }, [allQuestions, currentQuestion]);

    const handleCreateQuiz = async (quiz, image) => {
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
        //
        formData.append("file", image);

        // console.log(formData.get("question"), "get");
        const info = {
            data: formData,
            id,
        };

        const promise = createQuestionFunc(info);

        toast.promise(promise, {
            loading: "Creating Question",
            success: (data) => {
                return data.msg;
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

            setAllQuestions_2(allQuestions);

            const res = await updateQuestionFunc(data);

            if (res.err) {
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
            success: questId
                ? (data) => {
                      return data.msg;
                  }
                : "Image Deleted",
            error: questId
                ? (data) => {
                      return data.err;
                  }
                : "Error deleting image",
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

    if (!data) {
        return <PageIsLoading message={"Setting up quiz editor..."} />;
    }

    return (
        <div className="isidoraReg">
            {/* Header */}

            <Header
                setShow={setShowQuizPanel}
                setShowRightSect={setShowRightSect}
                handleUpdateQuiz={handleUpdateQuiz}
                allQuestions={allQuestions}
                allQuestions_2={allQuestions_2}
                updatingQuest={updatingQuest}
                showSaveNoti={showSaveNoti}
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
                <SaveOptions />
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
                />
            </div>
        </div>
    );
};

export default QuizEditorPage;
