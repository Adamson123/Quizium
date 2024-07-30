import mongoose from "mongoose";

const QuestionsSchema = mongoose.Schema({
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
        required: true,
    },
    questions: [
        {
            question: String,
            image: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "question-images",
            },
            answer: Array,
            explanation: String,
            timeLimit: Number,
            answerOption: {
                required: true,
                type: String,
                enum: ["singleAnswer", "multiSelect"],
            },
            questionType: {
                type: String,
                enum: ["quiz", "trueFalse", "typeAnswer"],
                required: true,
            },

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
