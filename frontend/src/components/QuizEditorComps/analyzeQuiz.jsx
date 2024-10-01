const analyzeQuiz = (allQuestions) => {
  const errorMessage = (field, value, type) => {
    /*checking if the quiz with question type "quiz" 
      has more than 1 options that is not empty*/
    if (field === "options" && type === "quiz") {
      //filter out filled options
      const filteredOptions = value.filter((op) => {
        return op.text.trim(" ") !== "";
      });
      if (filteredOptions.length > 1) return "";
    }

    let filteredAnswers;
    if (field === "answer") {
      filteredAnswers = value.filter((op) => {
        return op.trim(" ") !== "";
      });
    }

    /*return if it's options field and the questionType is not "quiz" 
      cause we are only validating options fields in quiz with questionType "quiz"
      or if field is question and the value is not empty or if field is answer 
      and the answer has a valid value in it*/

    if (
      (field === "options" && type !== "quiz") ||
      (field === "question" && value.trim(" ")) ||
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

export default analyzeQuiz;
