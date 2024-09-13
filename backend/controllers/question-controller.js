import { QuestionsModel } from "../models/QuestionsModel.js";
import { QuizInfosModel } from "../models/QuizInfosModel.js";
import { CustomError } from "../errors/CustomError.js";
import { QuestionImagesModel } from "../models/QuestionImagesModel.js";
import { populateQuizAndQuest } from "../utils/populateQuiz.js";

//create new Question
export const createQuestion = async (req, res) => {
    const quiz = req.quiz;
    if (quiz.questionsLength >= 25) {
        throw CustomError(
            "You have reached your limit, Questions can't be added anymore",
            400
        );
    }

    const data = JSON.parse(req.body.question);
    if (!Object.keys(data).length) {
        throw new CustomError("Please provide quiz question", 400);
    }
    if (!data.questionType) {
        throw new CustomError("Error questionType is not defined", 400);
    }
    if (!data.answerOption) {
        throw new CustomError("Error answerOption is not defined");
    }

    let image;
    if (req.file) {
        const { buffer, mimetype } = req.file;
        image = await QuestionImagesModel.create({
            image: {
                data: buffer,
                contentType: mimetype,
            },
        });
    }
    const toAddTimeLimit = () => {
        return quiz.applyTime === "entire" ? 0 : quiz.timeLimit;
    };

    let question = await QuestionsModel.findOneAndUpdate(
        { parentId: quiz._id },
        {
            $push: {
                questions: {
                    ...data,
                    timeLimit: toAddTimeLimit(),
                    image: image?._id,
                },
            },
        },
        { new: true, upsert: true }
    );

    /*if the quiz does not have a questionId before for some 
    reasons(maybe as we are creating the quiz)(might be removed in the future)*/
    if (!quiz.questionsId) {
        console.log("for questionsId:nope not here");
        await QuizInfosModel.findByIdAndUpdate(quiz._id, {
            questionsId: question._id,
        });
    }

    await QuizInfosModel.findByIdAndUpdate(quiz._id, {
        questionsLength: question.questions.length,
    });

    const { quiz: updatedQuiz } = await populateQuizAndQuest(quiz._id);
    // console.log(quiz, "create quest");
    return res.status(201).json({ msg: "Question created", quiz: updatedQuiz });
};

//update Question
export const updateQuestion = async (req, res) => {
    const data = JSON.parse(req.body.question);
    if (!Object.keys(data).length) {
        throw new CustomError("Please provide quiz question", 400);
    }
    if (!data.questionType) {
        throw new CustomError("Question type is not defined", 400);
    }
    const quiz = req.quiz;

    let image;
    if (req.file) {
        const { buffer, mimetype } = req.file;

        if (data.image) {
            image = await QuestionImagesModel.findById(data.image);
        }

        if (!image) {
            console.log("not here");
            image = await QuestionImagesModel.create({
                image: {
                    data: buffer,
                    contentType: mimetype,
                },
                quizId: quiz._id,
                // name: uuid(),
            });
        } else {
            console.log("already here");
            image = await QuestionImagesModel.findByIdAndUpdate(image._id, {
                image: {
                    data: buffer,
                    contentType: mimetype,
                },
                // name: uuid(),
            });
        }
    }

    await QuestionsModel.findOneAndUpdate(
        {
            parentId: quiz._id,
            "questions._id": data._id,
        },
        {
            $set: {
                "questions.$.question": data.question,
                "questions.$.options": data.options,
                "questions.$.answer": data.answer,
                "questions.$.explanation": data.explanation,
                "questions.$.questionType": data.questionType,
                "questions.$.answerOption": data.answerOption,
                "questions.$.image": image?._id,
            },
        }
    );

    /*updating questionsLength in quiz, cause i didn't start adding questionsLength 
    to quiz at the beginning of this project (might be removed in the future) */
    if (!quiz.questionsLength) {
        await QuizInfosModel.findByIdAndUpdate(quiz._id, {
            questionsLength: question.questions.length,
        });
    }

    const { quiz: updatedQuiz } = await populateQuizAndQuest(quiz._id);

    return res.status(200).json({ msg: "Question updated", quiz: updatedQuiz });
};

//delete question

export const deleteQuestion = async (req, res) => {
    const quiz = req.quiz;
    const data = req.body;

    if (data.questId) {
        const question = await QuestionsModel.findOneAndUpdate(
            {
                parentId: quiz._id,
            },
            {
                $pull: { questions: { _id: data.questId } },
            }
        );

        await QuizInfosModel.findByIdAndUpdate(quiz._id, {
            questionsLength: question.questions.length,
        });
    }

    data.image && (await QuestionImagesModel.findByIdAndDelete(data.image));
    const { quiz: updatedQuiz } = await populateQuizAndQuest(quiz._id);

    return res.status(200).json({ msg: "Question deleted", quiz: updatedQuiz });
};
