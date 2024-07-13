import { CustomError } from "../errors/CustomError.js";
import { QuizInfoModel } from "../models/QuizInfoModel.js";
import { QuizImageModel } from "../models/QuizImageModel.js";

export const createQuiz = async (req, res) => {
    const { title, subject, timeLimit, description } = req.body;

    console.log("from quiz body", req.body);
    if (!title || !subject || !timeLimit) {
        throw new CustomError(req.body, 400);
    }

    const defaultImage = "668d6b65176b423df03cea5c";

    let newQuiz = await QuizInfoModel.create({
        title,
        subject,
        timeLimit,
        coverImg: defaultImage,
        description,
    });

    if (req.file) {
        const { buffer, mimetype } = req.file;

        console.log("buffer", buffer);

        const image = await QuizImageModel.create({
            quizId: newQuiz._id,
            image: {
                data: buffer,
                contentType: mimetype,
            },
        });

        newQuiz = await QuizInfoModel.findByIdAndUpdate(
            { _id: newQuiz._id },
            { coverImg: image._id }
        );
    }

    res.status(201).json({ newQuiz });
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
