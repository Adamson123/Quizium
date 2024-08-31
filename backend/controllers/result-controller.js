import { CustomError } from "../errors/CustomError.js";
import { QuizInfosModel } from "../models/QuizInfosModel.js";
import { ResultsModel } from "../models/ResultsModel.js";

export const createResult = async (req, res) => {
    const data = req.body;
    if (!data) throw new CustomError("Please provide result", 400);
    const quiz = await QuizInfosModel.findById(data.quizId);

    if (!quiz) {
        throw new CustomError("404 quiz not found", 404);
    }
    const userId = req.userId;

    //adding id of people that have played the quiz
    if (!quiz.numOfPlays.includes(userId)) {
        await QuizInfosModel.findByIdAndUpdate(data.quizId, {
            $push: {
                numOfPlays: userId,
            },
        });
    }
    const result = await ResultsModel.create({ ...data, resultOwner: userId });

    return res.json({ id: result._id, msg: "Quiz Submitted" });
};

export const getSingleResult = async (req, res) => {
    const { id } = req.params;
    const result = await ResultsModel.findById(id); //.populate("results.image");

    if (!result) {
        throw new CustomError("404 result not found", 404);
    }

    return res.json(result);
};
