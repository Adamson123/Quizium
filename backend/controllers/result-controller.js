import { CustomError } from "../errors/CustomError.js";
import { HostInfoModel } from "../models/HostInfoModel.js";
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

    const results = await ResultsModel.create({ ...data, resultOwner: userId });
    //saving to live session if the quiz played is live
    if (data.hostInfos) {
        await HostInfoModel.findByIdAndUpdate(
            data.hostInfos,
            {
                $push: {
                    participantsResults: [
                        {
                            userId,
                            result: results._id,
                        },
                    ],
                },
            },
            { new: true }
        );
    }

    return res.status(200).json({ id: results._id, msg: "Quiz Submitted" });
};

export const getSingleResult = async (req, res) => {
    const { id } = req.params;
    const result = await ResultsModel.findById(id).populate({
        path: "hostInfos",
        sort: "participants.points",
        populate: {
            path: "hostedBy",
            select: "-password -email -profileImg -favorites",
        },
    });

    if (!result) {
        throw new CustomError("404 result not found", 404);
    }

    return res.status(200).json(result);
};

export const getUserResults = async (req, res) => {
    const userId = req.userId;
    console.log(userId, "userId");

    const results = await ResultsModel.find({ resultOwner: userId });
    return res
        .status(200)
        .json({ msg: "You asked for your results?🤔", results });
};
export const deleteResult = async (req, res) => {
    //console.log(id, "here");
    const { id } = req.params;

    const results = await ResultsModel.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Result deleted", results });
};
