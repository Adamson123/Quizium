import { CustomError } from "../errors/CustomError.js";
import { QuizInfoModel } from "../models/QuizInfoModel.js";
import { QuizImageModel } from "../models/QuizImageModel.js";

export const createQuiz = async (req, res) => {
    const { title, category, applyTime, timeLimit, description, visibility } =
        JSON.parse(req.body.settings);

    console.log("from quiz body", visibility);
    if (!title || !category || !timeLimit) {
        throw new CustomError("Please fill all required fields", 400);
    }

    const defaultImage = "668fda636463ba0f347e8a73";

    //at first we are saving the quiz with a default cover image so that we can use the quiz id
    let newQuiz = await QuizInfoModel.create({
        title,
        category,
        timeLimit,
        coverImg: defaultImage,
        description,
        visibility,
        applyTime,
        createdBy: req.userId,
    });

    if (req.file) {
        const { buffer, mimetype } = req.file;

        const image = await QuizImageModel.create({
            quizId: newQuiz._id,
            image: {
                data: buffer,
                contentType: mimetype,
            },
        });
        //then we are updating the quiz with the id of the cover img
        newQuiz = await QuizInfoModel.findByIdAndUpdate(
            { _id: newQuiz._id },
            { coverImg: image._id }
        );
    }

    res.status(201).json({
        msg: "Quiz settings have been successfully created",
        quizId: newQuiz._id,
    });
};

export const editQuiz = async (req, res) => {
    const {
        title,
        category,
        applyTime,
        timeLimit,
        description,
        visibility,
        quizId,
        coverImgId,
    } = JSON.parse(req.body.settings);

    console.log("from quiz body", visibility);
    if (!title || !category || !timeLimit) {
        throw new CustomError("Please fill all required fields", 400);
    }

    let updatedQuiz = await QuizInfoModel.findByIdAndUpdate(quizId, {
        title,
        category,
        timeLimit,
        coverImg: coverImgId,
        description,
        visibility,
        applyTime,
        createdBy: req.userId,
    });

    if (req.file) {
        const { buffer, mimetype } = req.file;

        const defaultImage = "668fda636463ba0f347e8a73";

        if (coverImgId !== defaultImage) {
            await QuizImageModel.findByIdAndUpdate(coverImgId, {
                image: {
                    data: buffer,
                    contentType: mimetype,
                },
            });
        } else {
            /*if the id of the image is equal to defaultImage which means the user is still
        using quizzes default image , when this quiz settings  is being updated 
        create new image instead of updating quizzes default cover images*/
            //prevents default image from being modified

            const image = await QuizImageModel.create({
                quizId: newQuiz._id,
                image: {
                    data: buffer,
                    contentType: mimetype,
                },
            });

            updatedQuiz = await QuizInfoModel.findByIdAndUpdate(
                { _id: updatedQuiz._id },
                { coverImg: image._id }
            );
        }
    }

    res.status(201).json({
        msg: "Quiz settings have been successfully created",
        quizId: updatedQuiz._id,
    });
};

export const getAllQuizzes = async (req, res) => {
    const { skip, limit } = req.query;
    console.log("query", "skip", skip, "limit", limit);
    const quizzes = await QuizInfoModel.find()
        .skip(Number(skip))
        .limit(Number(limit))
        .populate("coverImg")
        .populate({ path: "createdBy", populate: { path: "profileImg" } });

    res.status(200).json(quizzes);
};
