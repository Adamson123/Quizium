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

export const updateSingleQuizSettings = async (req, res) => {
    const { title, category, applyTime, timeLimit, description, visibility } =
        JSON.parse(req.body.settings);

    const { id } = req.params;

    if (!title || !category || !timeLimit) {
        throw new CustomError("Please fill all required fields", 400);
    }

    const quiz = req.quiz;

    let updatedQuiz;

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
          the id of the old coverimg of the quiz if there is one else nothing🙄
        */
        return image ? image._id : hasCoverImg();
    };

    console.log(updateImage(), "cover image iddddd");
    updatedQuiz = await QuizInfosModel.findByIdAndUpdate(id, {
        title,
        category,
        applyTime,
        timeLimit,
        description,
        visibility,
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

    //  console.log(updatedQuestions);

    return res.status(201).json({
        msg: "Quiz settings has been updated successfully",
        id: updatedQuiz._id,
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
            populate: { path: "questions.image" },
            /* populate question and question image which is been refrenced
              in each questions
            */
        });

    return res.status(200).json(quiz);
};
