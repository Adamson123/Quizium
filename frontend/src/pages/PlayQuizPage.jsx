import { useMatch, useNavigate, useParams } from "react-router";
import Header from "../components/PlayQuizComps/Header";
import Question from "../components/PlayQuizComps/Question";
import { useMutation, useQuery } from "react-query";
import { getQuizWithQuestions } from "../api/QuizApi";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import NavLeftRight from "../components/PlayQuizComps/NavLeftRight";
import StartQuizCount from "../components/PlayQuizComps/StartQuizCount";
import { createResult } from "../api/ResultApi";

import { dataContext } from "../layouts/Layout";
import ConfirmAction from "../components/ConfirmAction";
import toast from "react-hot-toast";
import TimeUp from "../components/PlayQuizComps/TimeUp";
import PageIsLoading from "../components/ui/PageIsLoading";

const PlayQuizPage = () => {
    const { id } = useParams();
    const { data, isLoading, error, refetch } = useQuery(
        ["quiz-questions", id],
        () => getQuizWithQuestions({ id, checkOwner: false }),
        {
            retry: false,
        }
    );
    const { mutateAsync: createResultFunc, error: createResultError } =
        useMutation(createResult);
    const navigate = useNavigate();

    const [allQuestions, setAllQuestions] = useState([]);
    const [singleQuestion, setSingleQuestion] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [allQuestionsResults, setAllQuestionsResults] = useState([]);
    const [startQuiz, setStartQuiz] = useState(false);
    const [showStartCount, setShowStartCount] = useState(true);
    const timeSpent = useRef(0);
    const [showConfirm, setShowConfirm] = useState(false);
    const [timeUp, setTimeUp] = useState(false);
    const resultId = useRef();

    useEffect(() => {
        if (data) {
            setAllQuestions(data.quiz.questionsId?.questions || []);
            setSingleQuestion(
                data.quiz.questionsId?.questions[currentQuestion] || []
            );
        }
    }, [data]);

    useEffect(() => {
        if (allQuestions.length) {
            setSingleQuestion(allQuestions[currentQuestion]);
        }
    }, [currentQuestion]);

    const findQuestionResult = (questId = singleQuestion._id) => {
        const questionResult = allQuestionsResults.find(
            (quest) => quest.questionId === questId
        );
        return questionResult;
    };
    const questionNavRef = useRef();
    const value = useContext(dataContext);

    //will give us all the time spent on each questions added up together(each)
    const getAllTimeSpent = () => {
        let defaultAllTime = 0;
        allQuestions.forEach((res) => {
            defaultAllTime += res.timeLimit;
        });

        let allTime = 0;
        allQuestionsResults.forEach((res) => {
            allTime += res.timeSpent;
        });

        return defaultAllTime - allTime;
    };

    const submitQuiz = async (navi) => {
        if (!startQuiz) {
            return;
        }
        setStartQuiz(false);
        console.log(timeSpent.current);
        /*to get entireTimeSpent we will substract time remaining 
        on the quiz from the raw(coming from the server) timeLimit  (entire)
        */
        const result = {
            results: allQuestionsResults,
            questionsLength: allQuestions.length,
            title: data.quiz.title,
            resultOwner: value?.userId,
            quizId: id,
            timeLimit: data?.quiz.timeLimit,
            applyTime: data.quiz.applyTime,
            entireTimeSpent:
                data.quiz.applyTime === "entire"
                    ? data?.quiz.timeLimit - timeSpent.current
                    : getAllTimeSpent(),
            quizType: "solo",
        };

        const promise = createResultFunc(result);
        toast.promise(promise, {
            loading: "Submitting quiz",
            success: (data) => {
                return data.msg;
            },
            error: "Error submitting quiz",
        });
        const res = await promise;

        if (createResultError) {
            return;
        }

        if (navi) {
            navigate("/result/" + res.id);
        }

        resultId.current = res.id;
    };

    const selectAnswer = (id) => {
        if (findQuestionResult() || !startQuiz) {
            return;
        }
        const {
            question,
            answer,
            questionType,
            answerOption,
            options,
            _id: questionId,
            image,
        } = singleQuestion;

        const data = singleQuestion.image?.image.data.data;
        const contentType = singleQuestion.image?.image.contentType;
        const validateAns = () => {
            let contain = true;
            const answersToLowerCase = answer.map((ans) => {
                return ans.toLowerCase();
            });
            id.forEach((ans) => {
                //answer does not contain it set contain to false
                if (
                    !answer.includes(ans) &&
                    singleQuestion.questionType !== "typeAnswer"
                ) {
                    contain = false;
                }

                //for checking answer in a case sensitive way for typeAnswer
                if (
                    !answersToLowerCase.includes(ans.toLowerCase()) &&
                    singleQuestion.questionType === "typeAnswer"
                ) {
                    contain = false;
                }
                // console.log(answersToLowerCase);
            });

            if (!id.length) {
                contain = false;
            }

            //validate length if questype is quiz else just return true
            const validateLength =
                singleQuestion.questionType !== "quiz"
                    ? true
                    : answer.length === id.length;

            return validateLength && contain;
        };

        setAllQuestionsResults([
            ...allQuestionsResults,
            {
                question,
                answer,
                questionType,
                answerOption,
                options,
                userAnswer: id,
                correct: validateAns(),
                questionId,
                // image: {
                //     data,
                //     contentType,
                // },
                timeSpent: timeSpent.current,
                seenExplanation: false,
            },
        ]);

        //console.log(tSpent, "opp");

        if (id.length) {
            validateAns()
                ? toast.success("Correct!!🎉", {
                      style: {
                          width: "230px",
                          height: "60px",
                          background: "rgb(74,222,128)",
                          color: "white",
                          borderRadius: "2px",
                          boxShadow: "inset -2px -2px 10px rgba(0, 0, 0, 0.4)",

                          // border: "2px solid white",
                      },
                      iconTheme: {
                          primary: "rgb(74,222,128)",
                      },
                      icon: <span className="bi-check text-[33px]"></span>,
                  })
                : toast.error("Incorrect", {
                      style: {
                          width: "230px",
                          height: "60px",
                          background: "rgb(239,68,68)",
                          color: "white",
                          borderRadius: "2px",
                          boxShadow: "inset -2px -2px 10px rgba(0, 0, 0, 0.4)",
                          // border: "2px solid white",
                      },
                      iconTheme: {
                          primary: "rgb(239,68,68)",
                      },
                      icon: (
                          <span className="bi-x text-[33px] font-bold"></span>
                      ),
                  });
        }
        if (data?.quiz.applyTime === "entire") {
            return;
        }

        if (!id.length) {
            console.log("time up");
            return toast.error("Time up!");
        }
    };

    useEffect(() => {
        const preventReload = (event) => {
            if (allQuestionsResults && startQuiz) {
                event.preventDefault();
                event.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", preventReload);

        return () => {
            window.removeEventListener("beforeunload", preventReload);
        };
    });

    console.log("play quiz is re-rendering");

    if (!data && isLoading) {
        return <PageIsLoading message={"Loading..."} />;
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

        if (!data.quiz.questionsId) {
            toast.error("No questions");
            //return navigate("/");
        }

        if (error.err === "404 quiz not found") {
            history.replaceState(null, "", "/");
            return navigate("/404");
        } else {
            return navigate("/");
        }
    }

    return (
        <div className="flex flex-col gap-3 pb-2 bg-secMainBg">
            {showStartCount && (
                <StartQuizCount
                    setStartQuiz={setStartQuiz}
                    startQuiz={startQuiz}
                    setShowStartCount={setShowStartCount}
                />
            )}
            <Header
                setCurrentQuestion={setCurrentQuestion}
                currentQuestion={currentQuestion}
                allQuestions={allQuestions}
                findQuestionResult={findQuestionResult}
                timeLimit={Number(data?.quiz?.timeLimit)}
                questionNavRef={questionNavRef}
                startQuiz={startQuiz}
                setStartQuiz={setStartQuiz}
                timeSpent={timeSpent}
                submitQuiz={submitQuiz}
                setTimeUp={setTimeUp}
                applyTime={data?.quiz.applyTime}
                singleQuestion={singleQuestion}
                selectAnswer={selectAnswer}
                allQuestionsResults={allQuestionsResults}
            />
            <NavLeftRight
                allQuestions={allQuestions}
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                questionNavRef={questionNavRef}
                setShowConfirm={setShowConfirm}
                setStartQuiz={setStartQuiz}
                allQuestionsResults={allQuestionsResults}
                applyTime={data?.quiz.applyTime}
                findQuestionResult={findQuestionResult}
            />
            <Question
                singleQuestion={singleQuestion}
                allQuestionsResults={allQuestionsResults}
                setAllQuestionsResults={setAllQuestionsResults}
                currentQuestion={currentQuestion}
                findQuestionResult={findQuestionResult}
                allQuestions={allQuestions}
                setCurrentQuestion={setCurrentQuestion}
                startQuiz={startQuiz}
                selectAnswer={selectAnswer}
                timeSpent={timeSpent}
            />
            <ConfirmAction
                text="Are you sure you want to submit this quiz"
                setShowConfirm={setShowConfirm}
                showConfirm={showConfirm}
                executeAction={() => submitQuiz(true)}
            />
            <TimeUp timeUp={timeUp} resultId={resultId} navigate={navigate} />
        </div>
    );
};

export default PlayQuizPage;
