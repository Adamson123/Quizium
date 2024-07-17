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

    let newQuiz;

    if (req.file) {
        const { buffer, mimetype } = req.file;

        const image = await QuizImageModel.create({
            image: {
                data: buffer,
                contentType: mimetype,
            },
        });

        newQuiz = await QuizInfoModel.create({
            title,
            category,
            timeLimit,
            description,
            visibility,
            coverImg: image._id,
            applyTime,
            createdBy: req.userId,
        });
    } else {
        newQuiz = await QuizInfoModel.create({
            title,
            category,
            timeLimit,
            description,
            visibility,
            applyTime,
            createdBy: req.userId,
        });
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
