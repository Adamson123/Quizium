import { useMatch, useNavigate, useParams } from "react-router";
import Header from "../components/PlayQuizComps/Header";
import Question from "../components/PlayQuizComps/Question";
import { useMutation, useQuery } from "react-query";
import { getQuizWithQuestions } from "../api/QuizApi";
import { useEffect, useRef, useState } from "react";
import NavLeftRight from "../components/PlayQuizComps/NavLeftRight";
import StartQuizCount from "../components/PlayQuizComps/StartQuizCount";
import { createResult } from "../api/ResultApi";

import ConfirmAction from "../components/ConfirmAction";
import toast from "react-hot-toast";
import TimeUp from "../components/PlayQuizComps/TimeUp";
import PageIsLoading from "../components/ui/PageIsLoading";

/* applyTime = "each" is when all questions has thier own time
 (Which means if time is up question is automatically failed or you lose points ) */

/* applyTime = "entire" is when a general time is set for all questions
(Which means you can answer each questions at your own pace, but there is still a limit but
it set for) */

const PlayQuizPage = ({ quizId, hostId, socket, userId }) => {
    let { id } = useParams();

    id = quizId || id;
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

    const getResFromLocalStore = () => {
        let lsResult = sessionStorage.getItem(hostId);
        lsResult = lsResult ? JSON.parse(lsResult) : [];

        return hostId ? lsResult : [];
    };

    const getCurrentQuestFromStore = () => {
        const lsCurrentQuest = sessionStorage.getItem(
            `currentQuestion-${hostId}`
        );
        const storedCurrentQuest =
            hostId && lsCurrentQuest ? Number(lsCurrentQuest) : 0;

        return storedCurrentQuest;
    };

    const [allQuestions, setAllQuestions] = useState([]);
    const [singleQuestion, setSingleQuestion] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(
        getCurrentQuestFromStore()
    );
    const [allQuestionsResults, setAllQuestionsResults] = useState(
        getResFromLocalStore()
    );

    const [startQuiz, setStartQuiz] = useState(
        allQuestionsResults.length ? true : false
    );
    const [showStartCount, setShowStartCount] = useState(true);
    const timeSpent = useRef(0);
    const [showConfirm, setShowConfirm] = useState(false);
    const [timeUp, setTimeUp] = useState(false);
    const [resultId, setResultId] = useState("");
    //might be used in the future for storing timed up questions
    const [timedUpQuests, setTimedUpQuests] = useState([]);
    const questionNavRef = useRef();
    const submittedRef = useRef(false);
    const quizEndedRef = useRef(false);

    const randomizeQuestions = (arr) => {
        if (!arr) {
            return;
        }
        //getting the order that maybe already saved in the localstorage. so we dont't need to randomize anymore
        const lsRandomizedQuests = sessionStorage.getItem(
            `randomized-${hostId}`
        );
        //parsing it if it's returns a positive value and  whether the user is playing alive quiz
        const parsedIds =
            hostId && lsRandomizedQuests ? JSON.parse(lsRandomizedQuests) : [];

        const randomizedQuestions = [];
        if (parsedIds.length) {
            //pushing it into randomized quests array according to the order the ids are saved in ls storage
            parsedIds.forEach((id) => {
                const question = arr.find((que) => que._id === id);
                if (question) {
                    randomizedQuestions.push(question);
                }
            });
        }
        if (!randomizedQuestions.length) {
            while (arr.length) {
                const randomIndex = Math.floor(Math.random() * arr.length);
                randomizedQuestions.push(arr[randomIndex]);
                arr.splice(randomIndex, 1);
            }
        }

        //only saving the order to localstorage if the quiz is live
        if (hostId) {
            //saving the order of this quiz by the ids
            const randomizedQuestionsIds = randomizedQuestions.map((quest) => {
                return quest?._id;
            });
            sessionStorage.setItem(
                `randomized-${hostId}`,
                JSON.stringify(randomizedQuestionsIds)
            );
        }
        return randomizedQuestions;
    };
    useEffect(() => {
        if (data) {
            setAllQuestions(
                randomizeQuestions(data?.quiz.questionsId?.questions) || []
            );
        }
    }, [data]);

    useEffect(() => {
        if (allQuestions.length) {
            setSingleQuestion(allQuestions[currentQuestion]);
        }
        if (hostId) {
            sessionStorage.setItem(
                `currentQuestion-${hostId}`,
                currentQuestion
            );
        }
    }, [allQuestions, currentQuestion]);

    const findQuestionResult = (questId = singleQuestion?._id) => {
        const questionResult = allQuestionsResults.find(
            (quest) => quest.questionId === questId
        );
        return questionResult;
    };

    //will give us all the time spent on each questions added up together(each)
    const getAllTimeSpent = () => {
        let defaultAllTime = 0;
        allQuestions.forEach((res) => {
            defaultAllTime += res.timeLimit;
        });

        let allTime = 0;
        allQuestionsResults.forEach((res) => {
            allTime += res.timeRemaining;
        });

        return { defaultAllTime, allTimeSpent: defaultAllTime - allTime };
    };

    const getPoints = () => {
        //gets points from only questions that are answered correctly
        const questionPoints =
            allQuestionsResults?.filter((res) => {
                return res.correct === true;
            }).length * 10;

        //gets points or timeRemaining from only questions that are answered correctly
        let pointsForEach = 0;
        allQuestionsResults?.forEach((res) => {
            if (res.correct) {
                pointsForEach += res.timeRemaining;
            }
        });

        //applying points base on applyTime value
        const timePoints =
            data?.quiz.applyTime === "entire" ? 0 : pointsForEach;
        const points = questionPoints + timePoints;

        return points;
    };

    const submitQuiz = async (navi) => {
        //doing this for only solo quiz
        if (!startQuiz) {
            return;
        }
        setStartQuiz(false);

        /*to get entireTimeSpent we will substract time remaining 
        on the quiz from the raw(coming from the server) timeLimit  (entire)
        */
        const result = {
            results: allQuestionsResults,
            questionsLength: allQuestions.length,
            title: data.quiz.title,
            quizId: id,
            timeLimit: data?.quiz.timeLimit,
            applyTime: data.quiz.applyTime,
            entireTimeSpent:
                data.quiz.applyTime === "entire"
                    ? data?.quiz.timeLimit - timeSpent.current
                    : getAllTimeSpent().allTimeSpent,
            quizType: hostId ? "live" : "solo",
            points: getPoints(),
            hostInfos: hostId,
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
            history.replaceState(null, "", "/");
            navigate("/result/" + res.id);
        }
        setResultId(res.id);
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
                // image: image?._id,
                timeRemaining: timeSpent.current,
                seenExplanation: false,
            },
        ]);

        //console.log(tSpent, "opp");

        if (id.length) {
            validateAns()
                ? toast.success("Correct!!🎉", {
                      style: {
                          width: "230px",
                          height: "45px",
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
                      duration: 2000,
                  })
                : toast.error("Incorrect", {
                      style: {
                          width: "230px",
                          height: "45px",
                          background: "rgb(239,68,68)",
                          color: "white",
                          borderRadius: "2px",
                          boxShadow: `inset -2px -2px 10px 
                          rgba(0, 0, 0, 0.4)`,
                          // border: "2px solid white",
                      },
                      iconTheme: {
                          primary: "rgb(239,68,68)",
                      },
                      icon: (
                          <span className="bi-x text-[33px] font-bold"></span>
                      ),

                      duration: 2000,
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
            if (allQuestionsResults.length && startQuiz && !hostId) {
                event.preventDefault();
                event.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", preventReload);

        return () => {
            window.removeEventListener("beforeunload", preventReload);
        };
    });

    useEffect(() => {
        if (!hostId || !data || !startQuiz) {
            return;
        }
        socket.emit("update-points", {
            points: getPoints(),
            id: hostId,
            userId,
        });

        sessionStorage.setItem(hostId, JSON.stringify(allQuestionsResults));
        socket.on("get-host-info-res", (info) => {
            if (!info.err) {
                return;
            }
            quizEndedRef.current = true;
            setTimeUp(true);
            socket.disconnect();

            return;
        });
    }, [socket, allQuestionsResults, startQuiz]);

    useEffect(() => {
        if (timeUp && !submittedRef.current) {
            if (quizEndedRef.current) {
                // toast.error("Quiz was ended");
            }
            submitQuiz();
            submittedRef.current = true;
            return;
        }
    }, [timeUp]);

    if (
        error ||
        (!data && !isLoading) ||
        (!isLoading && !data?.quiz.questionsId)
    ) {
        toast.error(`  ${error?.err || "Error opening quiz"}`, {
            icon: (
                <span
                    className="bi-ban absolute w-5 h-5 bg-yellow-500 
                    rounded-full font-bold text-white flex justify-center
                    items-center"
                ></span>
            ),
        });
        //=== "404 quiz not found"
        if (error?.err) {
            history.replaceState(null, "", "/");
            return navigate("/404");
        } else {
            return navigate("/");
        }
    }

    if ((!data && isLoading) || (!allQuestions.length && !isLoading)) {
        return <PageIsLoading message={"Loading..."} />;
    }

    return (
        <div className="flex flex-col gap-3 pb-2 bg-secMainBg">
            {showStartCount && !allQuestionsResults.length && (
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
                setTimedUpQuests={setTimedUpQuests}
                hostId={hostId}
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
                timedUpQuests={timedUpQuests}
                singleQuestion={singleQuestion}
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
                executeAction={() => {
                    submitQuiz(true);
                }}
            />
            <TimeUp
                timeUp={timeUp}
                resultId={resultId}
                navigate={navigate}
                quizEndedRef={quizEndedRef}
            />
        </div>
    );
};

export default PlayQuizPage;
