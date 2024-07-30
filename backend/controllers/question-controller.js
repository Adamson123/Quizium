import { QuestionsModel } from "../models/QuestionsModel.js";
import { QuizInfosModel } from "../models/QuizInfosModel.js";
import { CustomError } from "../errors/CustomError.js";
import { QuestionImagesModel } from "../models/QuestionImagesModel.js";
import { v4 as uuid } from "uuid";
export const createQuestion = async (req, res) => {
    const { id } = req.params;

    const data = req.body;

    if (!Object.keys(data).length) {
        throw new CustomError("Please provide quiz question", 400);
    }

    if (!data.questionType) {
        throw new CustomError("Question type is not defined", 400);
    }

    const quiz = req.quiz;

    const toAddTimeLimit = () => {
        return quiz.applyTime === "entire" ? 0 : quiz.timeLimit;
    };

    await QuestionsModel.findOneAndUpdate(
        { parentId: id },
        { $push: { questions: { ...data, timeLimit: toAddTimeLimit() } } },
        { new: true, upsert: true }
    );

    const updatedQuiz = await QuizInfosModel.findById(id)
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

    //console.log(updatedQuiz, id);

    return res.status(201).json({ msg: "Question created", quiz: updatedQuiz });
};

export const updateQuestion = async (req, res) => {
    const { id } = req.params;

    const data = JSON.parse(req.body.question);

    if (!Object.keys(data).length) {
        throw new CustomError("Please provide quiz question", 400);
    }

    if (!data.questionType) {
        throw new CustomError("Question type is not defined", 400);
    }
    const quiz = req.quiz;

    let image;
    if (req.file) {
        const { buffer, mimetype } = req.file;

        image = await QuestionImagesModel.findById(data.image);
        if (!image) {
            console.log("not here");
            image = await QuestionImagesModel.create({
                image: {
                    data: buffer,
                    contentType: mimetype,
                },
                // name: uuid(),
            });
        } else {
            console.log("already here");
            image = await QuestionImagesModel.findOneAndUpdate(
                { _id: image._id },
                {
                    image: {
                        data: buffer,
                        contentType: mimetype,
                    },
                    // name: uuid(),
                }
            );
        }
    }

    const question = await QuestionsModel.findOneAndUpdate(
        {
            parentId: id,
            "questions._id": data._id,
        },
        {
            $set: {
                "questions.$.question": data.question,
                "questions.$.options": data.options,
                "questions.$.answer": data.answer,
                "questions.$.explanation": data.explanation,
                "questions.$.questionType": data.questionType,
                "questions.$.answerOption": data.answerOption,
                "questions.$.image": image && image._id,
            },
        }
    );

    const updatedQuiz = await QuizInfosModel.findById(quiz._id)
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
    return res.status(200).json({ msg: "Question updated", quiz: updatedQuiz });
};
