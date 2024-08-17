import { QuizInfosModel } from "../models/QuizInfosModel.js";
import { UsersModel } from "../models/UsersModel.js";

export const populateQuizAndQuest = async (id, userId) => {
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

    let favoriteQuizzes;
    if (userId) {
        favoriteQuizzes = await UsersModel.findById(userId);
    }

    return {
        quiz,
        viewerFavorites: favoriteQuizzes?.favorites,
    };
};

export const findAndPopulateUserQuizzes = async (userId) => {
    const findCreatedQuizzes = QuizInfosModel.find({
        createdBy: userId,
    }).populate("coverImg");
    const findFavoriteQuizzes = UsersModel.findById(userId)
        .populate({
            path: "favorites",
            populate: { path: "coverImg" },
        })
        .select("-password");

    const [createdQuizzes, favoriteQuizzes] = await Promise.all([
        findCreatedQuizzes,
        findFavoriteQuizzes,
    ]);

    return { createdQuizzes, favoriteQuizzes };
};
