import mongoose from "mongoose";

const QuestionImagesSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String,
    },
    name: String,
});

export const QuestionImagesModel = mongoose.model(
    "question-images",
    QuestionImagesSchema
);
