import { QuizInfosModel } from "../models/QuizInfosModel.js";

export const populateQuizAndQuest = async (id) => {
    const quiz = await QuizInfosModel.findById(id)
        .populate("coverImg") // populate quiz cover image
        .populate({
            path: "createdBy",
            select: "-password",
            populate: { path: "profileImg" } /*populate quiz
            creator info and creator profile image which is been refrenced from 
            user/creator info 
            */,
        })
        .populate({
            path: "questionsId",
            populate: { path: "questions.image" },
            /* populate question and question image which is been refrenced
              in each questions
            */
        });

    return quiz;
};
