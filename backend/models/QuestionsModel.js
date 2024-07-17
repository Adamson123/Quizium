import mongoose from "mongoose";

const QuestionsSchema = mongoose.Schema({
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
    },
    questions: [
        {
            id: mongoose.Schema.Types.ObjectId,
            question: String,
            image: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "questionsImages",
            },
            answer: String,
            explanation: String,
            timeLimit: Number,
            options: [
                {
                    text: String,
                    isCorrect: Boolean,
                },
            ],
        },
    ],
});

export const QuestionsModel = mongoose.model("questions", QuestionsSchema);
