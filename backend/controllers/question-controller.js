import { QuestionsModel } from "../models/QuestionsModel.js";
import { QuizInfosModel } from "../models/QuizInfosModel.js";
import { CustomError } from "../errors/CustomError.js";
import { QuestionImagesModel } from "../models/QuestionImagesModel.js";
import { populateQuizAndQuest } from "../utils/populateQuiz.js";

//create new Question
export const createQuestion = async (req, res) => {
    const data = JSON.parse(req.body.question);
    if (!Object.keys(data).length) {
        throw new CustomError("Please provide quiz question", 400);
    }
    if (!data.questionType) {
        throw new CustomError("Error questionType is not defined", 400);
    }
    if (!data.answerOption) {
        throw new CustomError("Error answerOption is not defined");
    }

    let image;
    if (req.file) {
        const { buffer, mimetype } = req.file;
        image = await QuestionImagesModel.create({
            image: {
                data: buffer,
                contentType: mimetype,
            },
        });
    }
    const quiz = req.quiz;
    const toAddTimeLimit = () => {
        return quiz.applyTime === "entire" ? 0 : quiz.timeLimit;
    };

    let question = await QuestionsModel.findOneAndUpdate(
        { parentId: quiz._id },
        {
            $push: {
                questions: {
                    ...data,
                    timeLimit: toAddTimeLimit(),
                    image: image?._id,
                },
            },
        },
        { new: true, upsert: true }
    );

    // //updating answer array with isCorrect:true options Id
    // let answer = [];
    // let questId;
    // question.questions.forEach((quest, index) => {
    //     // console.log(quest);

    //     console.log(question.questions.length, index, "length");

    //     if (question.questions.length - 1 === index) {
    //         console.log(quest, "quest");
    //         console.log(question.questions[index - 1], quest, "quest");

    //         quest.options.forEach((opt) => {
    //             //console.log(opt);
    //             if (opt.isCorrect) {
    //                 answer.push(opt._id);
    //             }
    //             questId = quest._id;
    //         });
    //     }
    // });

    // /*updating answer array with isCorrect:true if answer is filled,
    //  doing this for concise duplication of questions with question answers*/
    // if (answer.length) {
    //     question = await QuestionsModel.findOneAndUpdate(
    //         {
    //             parentId: quiz._id,
    //             "questions._id": questId,
    //         },
    //         {
    //             $set: {
    //                 "questions.$.answer": answer,
    //             },
    //         }
    //     );
    // }

    //if the quiz does not have a questionId before for some reasons
    if (!quiz.questionsId) {
        console.log("for questionsId:nope not here");
        await QuizInfosModel.findByIdAndUpdate(quiz._id, {
            questionsId: question._id,
        });
    }

    const { quiz: updatedQuiz } = await populateQuizAndQuest(quiz._id);
    console.log(quiz, "create quest");
    return res.status(201).json({ msg: "Question created", quiz: updatedQuiz });
};

//update Question
export const updateQuestion = async (req, res) => {
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
                quizId: quiz._id,
                // name: uuid(),
            });
        } else {
            console.log("already here");
            image = await QuestionImagesModel.findByIdAndUpdate(image._id, {
                image: {
                    data: buffer,
                    contentType: mimetype,
                },
                // name: uuid(),
            });
        }
    }

    await QuestionsModel.findOneAndUpdate(
        {
            parentId: quiz._id,
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

    const { quiz: updatedQuiz } = await populateQuizAndQuest(quiz._id);
    console.log(quiz);

    return res.status(200).json({ msg: "Question updated", quiz: updatedQuiz });
};

//delete question

export const deleteQuestion = async (req, res) => {
    const quiz = req.quiz;
    const data = req.body;
    if (data.questId) {
        await QuestionsModel.findOneAndUpdate(
            {
                parentId: quiz._id,
            },
            {
                $pull: { questions: { _id: data.questId } },
            }
        );
    }
    await QuestionImagesModel.findByIdAndDelete(data.image);
    const { quiz: updatedQuiz } = await populateQuizAndQuest(quiz._id);
    //console.log(updatedQuiz);

    return res.status(204).json({ msg: "Question deleted", quiz: updatedQuiz });
};
