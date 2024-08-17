import { useParams } from "react-router";
import Header from "../components/PlayQuizComps/Header";
import Question from "../components/PlayQuizComps/Question";
import { useQuery } from "react-query";
import { getQuizWithQuestions } from "../api/QuizApi";
import { useEffect, useState } from "react";
const PlayQuizPage = () => {
    const { id } = useParams();
    const { data, isLoading, error, refetch } = useQuery(
        ["quiz-questions", id],
        () => getQuizWithQuestions({ id, checkOwner: false }),
        {
            retry: false,
        }
    );

    const [allQuestions, setAllQuestions] = useState([]);
    const [singleQuestion, setSingleQuestion] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [allQuizResults, setAllQuizResults] = useState([]);

    useEffect(() => {
        if (data) {
            setAllQuestions(data.quiz.questionsId.questions);
            setSingleQuestion(data.quiz.questionsId.questions[currentQuestion]);
        }
    }, [data]);

    useEffect(() => {
        if (allQuestions.length) {
            setSingleQuestion(allQuestions[currentQuestion]);
        }
    }, [currentQuestion]);
    //console.log(data);

    return (
        <div className="min-h-screen flex flex-col gap-5 pb-7">
            <Header
                questionsAmount={allQuestions.length}
                setCurrentQuestion={setCurrentQuestion}
                currentQuestion={currentQuestion}
            />
            <Question
                singleQuestion={singleQuestion}
                allQuizResults={allQuizResults}
                setAllQuizResults={setAllQuizResults}
                currentQuestion={currentQuestion}
            />
        </div>
    );
};

export default PlayQuizPage;
