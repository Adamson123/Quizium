import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router";
import { getQuizWithQuestions } from "../api/QuizApi";
import { useMutation, useQuery } from "react-query";
import { createQuestion, updateQuestion } from "../api/QuestionApi";
import QuizSettings from "../components/QuizSettings";
import quiziumImg from "../assets/images/defaultCover/quizium-8.webp";
import PageIsLoading from "../components/ui/PageIsLoading";
import Header from "../components/CreateQuestComps/Header";
import QuizzesMenu from "../components/CreateQuestComps/QuizzesMenu";
import RightSection from "../components/CreateQuestComps/RightSection";
import Question from "../components/CreateQuestComps/Question";
import toast from "react-hot-toast";
import RenderTest from "../utils/RenderTest";
const CreateQuestPage = () => {
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

    //all quiz questions
    const [allQuestions, setAllQuestions] = useState();
    const [allQuestions_2, setAllQuestions_2] = useState();

    //new data to be sent
    const [singleQuestion, setSingleQuestion] = useState();
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
            setSingleQuestion((q) => (q = allQuestions[currentQuestion]));
        }
    }, [allQuestions, currentQuestion]);

    const handleCreateQuiz = async () => {
        const data = {
            data: {
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
            },
            id,
        };

        const promise = createQuestionFunc(data);

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
            console.log("updating quiz");
            const formData = new FormData();
            formData.append("file", imagePicked);
            formData.append("question", JSON.stringify(singleQuestion));

            const data = {
                data: formData,
                id,
            };
            // const res = await updateQuestionFunc(data);

            //setAllQuestions(res.quiz.questionsId.questions);
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
                {/*  Enter Question &  options container*/}
                <Question
                    allQuestions={allQuestions}
                    setAllQuestions={setAllQuestions}
                    singleQuestion={singleQuestion}
                    currentQuestion={currentQuestion}
                    imagePicked={imagePicked}
                    setPickedImage={setPickedImage}
                    allQuestions_2={allQuestions_2}
                />
                {/* right section( Answer Options , Quiz type , Delete ) */}
                {singleQuestion && (
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
                    />
                )}
                {/* quizzes menu  */}
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

export default CreateQuestPage;
