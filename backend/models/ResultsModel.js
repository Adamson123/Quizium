import mongoose from "mongoose";

const ResultsSchema = new mongoose.Schema(
    {
        results: [
            {
                question: String,
                answer: Array,
                questionType: String,
                options: Array,
                userAnswer: Array,
                correct: Boolean,
                questionId: String,
                // image: {
                //     contentType: String,
                //     data: Buffer,
                // },
                timeSpent: Number,
                answerType: String,
            },
        ],
        questionsLength: {
            type: Number,
        },
        title: String,
        resultOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "quiz-infos",
        },
        timeLimit: {
            type: Number,
            required: true,
        },
        applyTime: {
            type: String,
            required: true,
            enum: ["entire", "each"],
        },
        entireTimeSpent: Number,
        quizType: {
            type: String,
            required: true,
            enum: ["solo", "live"],
        },
        hostedQuiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "live-quizzes",
        },
    },
    { timestamps: true }
);

export const ResultsModel = mongoose.model("results", ResultsSchema);
