import { CustomError } from "../errors/CustomError.js";
import { QuizInfosModel } from "../models/QuizInfosModel.js";

export const quizExist = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        throw new CustomError("Please provide quiz id", 400);
    }

    const quiz = await QuizInfosModel.findById(id);

    if (!quiz) {
        throw new CustomError("404 quiz not found", 404);
    }

    req.quiz = quiz;
    next();
};
