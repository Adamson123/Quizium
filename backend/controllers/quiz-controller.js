import { CustomError } from "../errors/CustomError.js";
import { QuizInfosModel } from "../models/QuizInfosModel.js";
import { QuizImagesModel } from "../models/QuizImagesModel.js";
import { QuestionsModel } from "../models/QuestionsModel.js";
import {
    findAndPopulateUserQuizzes,
    populateQuizAndQuest,
} from "../utils/populateQuiz.js";
import { QuestionImagesModel } from "../models/QuestionImagesModel.js";

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
                answerOption: "singleAnswer",
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

export const updateQuiz = async (req, res) => {
    const { id } = req.params;

    const settings = JSON.parse(req.body.settings);
    const { title, category, applyTime, timeLimit, description, visibility } =
        settings;
    // if (!title || !category || !timeLimit) {
    //     throw new CustomError("Please fill all required fields", 400);
    // }

    const quiz = req.quiz;

    let image;
    if (req.file) {
        const { buffer, mimetype } = req.file;

        const imageExist = await QuizImagesModel.findById(quiz.coverImg);

        if (imageExist) {
            console.log("already here");
            image = await QuizImagesModel.findByIdAndUpdate(quiz.coverImg, {
                image: {
                    data: buffer,
                    contentType: mimetype,
                },
            });
        } else {
            console.log("already here");
            image = await QuizImagesModel.create({
                image: {
                    data: buffer,
                    contentType: mimetype,
                },
            });
        }
    }

    const updateImage = () => {
        const hasCoverImg = () => {
            return quiz.coverImg && quiz.coverImg;
        };
        /*return cover image id if one was created or updated above, else return 
          the id of the old coverimg of the quiz if there is no one else🙄
        */
        return image ? image._id : hasCoverImg();
    };

    const updateProvidedField = () => {
        const update = {};

        const keys = Object.keys(settings);
        keys.forEach((k) => {
            update[k] = settings[k];
        });

        delete update?.coverImg;
        return update;
    };

    /*title,
        category,
        applyTime,
        timeLimit,
        description,
        visibility*/

    const updatedQuiz = await QuizInfosModel.findByIdAndUpdate(id, {
        ...updateProvidedField(),
        coverImg: updateImage(),
    });

    const toAddTimeLimit = () => {
        return applyTime === "entire" ? 0 : timeLimit;
    };

    //update time limit for all questions in the questions array
    await QuestionsModel.findOneAndUpdate(
        { parentId: updatedQuiz._id },
        {
            $set: {
                "questions.$[].timeLimit": toAddTimeLimit(),
            },
        }
    );

    const userId = req.userId;
    const quizzes = await QuizInfosModel.find({ createdBy: userId }).populate(
        "coverImg"
    );

    return res.status(200).json({
        msg: "Quiz settings has been updated successfully",
        id: updatedQuiz._id,
        quizzes,
    });
};

export const deleteQuiz = async (req, res) => {
    const quiz = req.quiz;

    await Promise.all([
        QuestionImagesModel.deleteMany({ quizId: quiz._id }),
        QuizImagesModel.findByIdAndDelete(quiz.coverImg),
        QuestionsModel.findOneAndDelete({ parentId: quiz._id }),
        QuizInfosModel.findByIdAndDelete(quiz._id),
    ]);
    const userId = req.userId;
    const quizzes = await QuizInfosModel.find({ createdBy: userId }).populate(
        "coverImg"
    );

    console.log("quiz deleted");
    return res.status(204).json({ quizzes, msg: "Quiz deleted" });
};

export const getMultipleQuizzes = async (req, res) => {
    const { skip, limit } = req.query;
    console.log("get multiple quiz:", "skip", skip, "limit", limit);
    const quizzes = await QuizInfosModel.find({ draft: false })
        .skip(Number(skip))
        .limit(Number(limit))
        .populate("coverImg")
        .populate({ path: "createdBy", populate: { path: "profileImg" } });

    return res.status(200).json(quizzes);
};

export const getUserQuizzes = async (req, res) => {
    const userId = req.userId;

    const { createdQuizzes, favoriteQuizzes } =
        await findAndPopulateUserQuizzes(userId);

    return res.status(200).json({ createdQuizzes, favoriteQuizzes });
};

export const getSingleQuizWithQuestions = async (req, res) => {
    const { id } = req.params;

    const { quiz, viewerFavorites } = await populateQuizAndQuest(
        id,
        req.userId
    );

    return res.status(200).json({ quiz, viewerFavorites });
};
