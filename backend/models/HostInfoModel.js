import mongoose from "mongoose";
const HostInfoSchema = new mongoose.Schema(
    {
        joinCode: Number,
        hostedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        quizId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "quiz-infos",
        },
        participants: [
            {
                socketId: String,
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                },
                nickname: String,
                avatar: String,
                points: {
                    type: Number,
                    default: 0,
                },
            },
        ],
        started: {
            type: Boolean,
            default: false,
        },
        ended: {
            type: Boolean,
            default: false,
        },
        questionsLength: Number,
        applyTime: String,
        participantsResults: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                },
                result: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "results",
                },
            },
        ],
        title: String,
    },
    { timestamps: true }
);
export const HostInfoModel = mongoose.model("host-infos", HostInfoSchema);
