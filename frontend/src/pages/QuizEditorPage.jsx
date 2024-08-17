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
import QuizzesMenu from "../components/QuizEditorComps/QuestionsMenu";
import RightSection from "../components/QuizEditorComps/RightSection";
import Question from "../components/QuizEditorComps/Question";
import toast from "react-hot-toast";
import QuizValidation from "../components/QuizEditorComps/QuizValidation";
import SaveOptions from "../components/QuizEditorComps/SaveOptions";
//import analizeQuiz from "../components/QuizEditorComps/analizeQuiz";

const QuizEditorPage = () => {
    const { id } = useParams();
    const { data, isLoading, error, refetch } = useQuery(
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
            console.log(data);

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
        if (res.err) {
            return;
        }
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
                console.log("res err caused it");

                return toast.error("Error saving previous changes");
            }

            if (imagePicked) {
                console.log("image picked caused it");
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

        console.log(info);

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
        console.log(res);
        if (res.err) {
            return;
        }

        setAllQuestions(res.quiz.questionsId.questions);
        setAllQuestions_2(res.quiz.questionsId.questions);

        if (questId && currentQuestion === allQuestions.length - 1) {
            //  if () {
            setCurrentQuestion(currentQuestion - 1);
            // }
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

    const questionConfig = useMemo(() => {
        return {
            allQuestions,
            setAllQuestions,
            singleQuestion: allQuestions[currentQuestion],
            currentQuestion,
            imagePicked,
            setPickedImage,
            allQuestions_2,
            handleDeleteQuiz,
        };
    }, [
        allQuestions_2,
        currentQuestion,
        imagePicked,
        singleQuestion?.answer,
        allQuestions,
    ]);

    console.log("create question re-rendered");

    if (!data && isLoading) {
        return <PageIsLoading message={"Setting up quiz editor..."} />;
    }

    if (!data && !isLoading) {
        toast.error(error.err);
        return navigate("/");
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
                handleUpdateQuiz={handleUpdateQuiz}
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
                        {questionConfig.singleQuestion && (
                            <Question questionConfig={questionConfig} />
                        )}
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
