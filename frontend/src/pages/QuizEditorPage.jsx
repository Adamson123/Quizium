import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { getQuizWithQuestions } from "../api/QuizApi";
import { useMutation, useQuery } from "react-query";
import {
    createQuestion,
    deleteQuestion,
    updateQuestion,
} from "../api/QuestionApi";
import QuizSettings from "../components/QuizSettings";

import PageIsLoading from "../components/ui/PageIsLoading";
import Header from "../components/QuizEditorComps/Header";
import QuestionsMenu from "../components/QuizEditorComps/QuestionsMenu";
import RightSection from "../components/QuizEditorComps/RightSection";
import Question from "../components/QuizEditorComps/Question";
import toast from "react-hot-toast";
import QuizValidation from "../components/QuizEditorComps/QuizValidation";
import SaveOptions from "../components/QuizEditorComps/SaveOptions";
//import analyzeQuiz from "../components/QuizEditorComps/analyzeQuiz";

const QuizEditorPage = () => {
    const { id } = useParams();
    const { data, isLoading, error, refetch, status } = useQuery(
        ["quiz-questions", id],
        () => getQuizWithQuestions({ id, checkOwner: true }),
        {
            retry: false,
        }
    );

    const navigate = useNavigate();
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

    const [imagePicked, setPickedImage] = useState("");
    const [showRightSect, setShowRightSect] = useState(false);
    const [showSaveNoti, setShowSaveNoti] = useState(false);
    const [showQuizValid, setShowQuizValid] = useState(false);
    const [showSaveOption, setShowSaveOption] = useState(false);
    const config = useMemo(() => {
        if (data) {
            const { quiz } = data;
            return {
                title: quiz.title,
                description: quiz.description,
                timeLimit: quiz.timeLimit,
                applyTime: quiz.applyTime,
                visibility: quiz.visibility,
                category: quiz.category,
                coverImg: quiz.coverImg,
                draft: quiz.draft,
                id: quiz._id,
            };
        }
    }, [data]);

    const saveOptionConfig = useMemo(() => {
        return {
            config,
            showSaveOption,
            setShowSaveOption,
            setShowQuizValid,
            allQuestions,
            refetch,
            setCurrentQuestion,
            showQuizValid,
        };
    }, [allQuestions_2, config, showSaveOption, showQuizValid]);
    //updating all questions array if questions has been fetched
    useEffect(() => {
        if (data) {
            //console.log(data);

            const { quiz } = data;
            if (quiz?.questionsId) {
                setAllQuestions(quiz.questionsId.questions);
                setAllQuestions_2(quiz.questionsId.questions);
            }
        }
    }, [data]);

    //updating single questions array if allQuestions array has been populated or if currentQuestion changes
    useEffect(() => {
        if (allQuestions) {
            setSingleQuestion(allQuestions[currentQuestion]);
        }
    }, [allQuestions, currentQuestion]);

    const handleCreateQuestion = async (quiz, image, duplicate) => {
        if (allQuestions.length >= 25) {
            return toast.error(
                "You have reached your limit, Questions can't be added anymore"
            );
        }

        const quizInfo = quiz
            ? quiz
            : {
                  question: "",
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
        if (res.err) {
            return;
        }

        setAllQuestions(res.quiz.questionsId.questions);
        setAllQuestions_2(res.quiz.questionsId.questions);
        setCurrentQuestion(res.quiz.questionsId.questions.length - 1);
    };

    const handleUpdateQuestion = async () => {
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

    const handleDeleteQuestion = async (questId) => {
        if (deletingQuest) {
            return;
        }
        if (allQuestions.length === 1 && questId) {
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
                return questId ? data.err : "Error deleting image";
            },
        });

        const res = await promise;

        if (res.err) {
            return;
        }

        let resQuestions = res.quiz.questionsId.questions;

        if (!questId) {
            resQuestions = resQuestions.map((quest, index) => {
                if (currentQuestion === index) {
                    return { ...singleQuestion, image: "" };
                } else {
                    return quest;
                }
            });
        }

        setAllQuestions(resQuestions);
        setAllQuestions_2(resQuestions);

        if (questId && currentQuestion === allQuestions.length - 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    useEffect(() => {
        if (imagePicked) {
            handleUpdateQuestion();
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

    if (!data && isLoading) {
        return <PageIsLoading message={"Setting up quiz editor..."} />;
    }

    if (error) {
        toast.error(`  ${error.err}`, {
            icon: (
                <span
                    className="bi-ban absolute w-5 h-5 bg-yellow-500 
                    rounded-full font-bold text-white flex justify-center
                    items-center"
                ></span>
            ),
        });
        console.log(status, "status");

        if (error.err === "404 quiz not found") {
            history.replaceState(null, "", "/");
            return navigate("/404");
        } else {
            return navigate("/");
        }
    }

    return (
        <div
            className={`${
                showQuizPanel ||
                showSaveOption ||
                (showQuizValid && "overflow-hidden")
            } bg-secMainBg text-textColor`}
        >
            {/* Header */}

            <Header
                setShow={setShowQuizPanel}
                setShowRightSect={setShowRightSect}
                handleUpdateQuestion={handleUpdateQuestion}
                allQuestions={allQuestions}
                allQuestions_2={allQuestions_2}
                updatingQuest={updatingQuest}
                showSaveNoti={showSaveNoti}
                setShowSaveOption={setShowSaveOption}
                config={config}
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
                <SaveOptions saveOptionConfig={saveOptionConfig} />
                <QuizValidation saveOptionConfig={saveOptionConfig} />
                {/*  Enter Question &  options container*/}
                {singleQuestion && (
                    <>
                        {
                            <Question
                                allQuestions={allQuestions}
                                allQuestions_2={allQuestions_2}
                                currentQuestion={currentQuestion}
                                handleDeleteQuestion={handleDeleteQuestion}
                                imagePicked={imagePicked}
                                setAllQuestions={setAllQuestions}
                                setPickedImage={setPickedImage}
                                singleQuestion={singleQuestion}
                            />
                        }
                        {/* right section( Answer Options , Quiz type , Delete )
                         */}
                        <RightSection
                            singleQuestion={singleQuestion}
                            setSingleQuestion={setSingleQuestion}
                            setAllQuestions={setAllQuestions}
                            allQuestions={allQuestions}
                            currentQuestion={currentQuestion}
                            handleUpdateQuestion={handleUpdateQuestion}
                            showRightSect={showRightSect}
                            setShowRightSect={setShowRightSect}
                            allQuestions_2={allQuestions_2}
                            handleDeleteQuestion={handleDeleteQuestion}
                            handleCreateQuestion={handleCreateQuestion}
                        />
                    </>
                )}
                {/* quizzes menu */}
                <QuestionsMenu
                    allQuestions={allQuestions}
                    imagePicked={imagePicked}
                    handleCreateQuestion={handleCreateQuestion}
                    handleUpdateQuestion={handleUpdateQuestion}
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
