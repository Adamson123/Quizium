import { CustomError } from "../errors/CustomError.js";
import { QuizInfosModel } from "../models/QuizInfosModel.js";
import { QuizImagesModel } from "../models/QuizImagesModel.js";
import { QuestionsModel } from "../models/QuestionsModel.js";
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

        const image = await QuizImagesModel.create({
            image: {
                data: buffer,
                contentType: mimetype,
            },
        });

        newQuiz = await QuizInfosModel.create({
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
        newQuiz = await QuizInfosModel.create({
            title,
            category,
            timeLimit,
            description,
            visibility,
            applyTime,
            createdBy: req.userId,
        });
    }

    const toAddTimeLimit = () => {
        return applyTime === "entire" ? 0 : timeLimit;
    };
    const question = await QuestionsModel.create({
        parentId: newQuiz._id,
        questions: [
            {
                question: "",
                answer: "",
                explanation: "",
                timeLimit: toAddTimeLimit(),
                questionType: "quiz",
                options: [
                    {
                        text: "",
                        isCorrect: false,
                    },
                    {
                        text: "",
                        isCorrect: false,
                    },
                    {
                        text: "",
                        isCorrect: false,
                    },
                    {
                        text: "",
                        isCorrect: false,
                    },
                ],
            },
        ],
    });

    await QuizInfosModel.findByIdAndUpdate(newQuiz._id, {
        questionsId: question._id,
    });

    return res.status(201).json({
        msg: "Quiz settings have been successfully created",
        quizId: newQuiz._id,
    });
};

export const updateSingleQuizSettings = async (req, res) => {
    console.log(req.body.settings);
    const { title, category, applyTime, timeLimit, description, visibility } =
        JSON.parse(req.body.settings);

    // console.log(req.body.settings);
    const quizId = req.params.id;

    console.log("from edit quiz setting body", visibility);
    if (!title || !category || !timeLimit) {
        throw new CustomError("Please fill all required fields", 400);
    }

    const quiz = await QuizInfosModel.findById(quizId);

    if (!quiz) {
        throw new CustomError("404 quiz not found", 404);
    }

    let updatedQuiz;

    if (req.file) {
        const { buffer, mimetype } = req.file;

        const imageExist = await QuizImagesModel.findById(quizId);

        let image;

        if (imageExist) {
            image = await QuizImagesModel.findByIdAndUpdate(quizId, {
                image: {
                    data: buffer,
                    contentType: mimetype,
                },
            });
        } else {
            image = await QuizImagesModel.create({
                image: {
                    data: buffer,
                    contentType: mimetype,
                },
            });
        }
        updatedQuiz = await QuizInfosModel.findByIdAndUpdate(quizId, {
            title,
            category,
            applyTime,
            timeLimit,
            description,
            visibility,
            coverImg: image._id,
        });
        console.log(" hit file was sent");
    } else {
        updatedQuiz = await QuizInfosModel.findByIdAndUpdate(quizId, {
            title,
            category,
            applyTime,
            timeLimit,
            description,
            visibility,
        });

        console.log("hit no file was sent");
    }

    const toAddTimeLimit = () => {
        return applyTime === "entire" ? 0 : timeLimit;
    };

    console.log("timeLimit", toAddTimeLimit());

    //update time limit for all questions in the questions array
    await QuestionsModel.findOneAndUpdate(
        { parentId: updatedQuiz._id },
        {
            $set: {
                "questions.$[].timeLimit": toAddTimeLimit(),
            },
        }
    );

    //  console.log(updatedQuestions);

    return res.status(201).json({
        msg: "Quiz settings has been updated successfully",
        quizId: updatedQuiz._id,
    });
};

export const getMultipleQuizzes = async (req, res) => {
    const { skip, limit } = req.query;
    console.log("query", "skip", skip, "limit", limit);
    const quizzes = await QuizInfosModel.find()
        .skip(Number(skip))
        .limit(Number(limit))
        .populate("coverImg")
        .populate({ path: "createdBy", populate: { path: "profileImg" } });

    return res.status(200).json(quizzes);
};

export const getSingleQuizWithQuestions = async (req, res) => {
    const { id } = req.params;
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
        });

    if (!quiz) {
        throw new CustomError("404 quiz not found", 404);
    }

    return res.status(200).json(quiz);
};
