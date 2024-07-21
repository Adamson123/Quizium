import { QuestionsModel } from "../models/QuestionsModel.js";
import { QuizInfosModel } from "../models/QuizInfosModel.js";

export const createQuestion = async (req, res) => {
    const { id } = req.params;

    const data = req.body;

    //console.log(data, id);

    if (!Object.keys(data).length) {
        throw new CustomError("Please provide quiz question", 400);
    }

    if (!data.questionType) {
        throw new CustomError("Question type is not defined", 400);
    }

    const quiz = await QuizInfosModel.findById(id);

    if (!quiz) {
        throw new CustomError("404 quiz not found", 404);
    }

    const toAddTimeLimit = () => {
        return quiz.applyTime === "entire" ? 0 : quiz.timeLimit;
    };

    await QuestionsModel.findOneAndUpdate(
        { parentId: id },
        { $push: { questions: { ...data, timeLimit: toAddTimeLimit() } } },
        { new: true, upsert: true }
    );

    return res.status(201).json({ msg: "Question created" });
};

export const updateQuestion = async (req, res) => {
    const { id } = req.params;

    const data = req.body;
    if (!Object.keys(data).length) {
        throw new CustomError("Please provide quiz question", 400);
    }

    if (!data.questionType) {
        throw new CustomError("Question type is not defined", 400);
    }

    const quiz = await QuizInfosModel.findById(id);

    if (!quiz) {
        throw new CustomError("404 quiz not found", 400);
    }

    await QuestionsModel.findOneAndUpdate(
        {
            parentId: id,
            questions_id: data._id,
        },
        {
            $set: {
                "questions.$.question": data.question,
                "question.$.options": data.options,
                "question.$.answer": data.answer,
                "question.$.explanation": data.explanation,
                "question.$.questionType": data.questionType,
            },
        }
    );

    return res.status(200).json({ msg: "Question updated" });
};
