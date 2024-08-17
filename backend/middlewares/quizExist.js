import { CustomError } from "../errors/CustomError.js";
import { QuizInfosModel } from "../models/QuizInfosModel.js";

export const quizExist = async (req, res, next) => {
    const { id } = req.params;
    const { checkOwner } = req.query;
    if (!id) {
        throw new CustomError("Please provide quiz id", 400);
    }

    const quiz = await QuizInfosModel.findById(id);

    if (!quiz) {
        console.log("err quiz not found");
        throw new CustomError("404 quiz not found", 404);
    }

    if (checkOwner === "true" && quiz.createdBy.toString() !== req.userId) {
        throw new CustomError("Opps! sorry you can't modify this quiz🚨", 403);
    }

    req.quiz = quiz;

    next();
};
