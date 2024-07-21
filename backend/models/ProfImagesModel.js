import mongoose from "mongoose";

const ProfImagesSchema = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String,
    },
});

export const ProfImagesModel = mongoose.model(
    "profile-images",
    ProfImagesSchema
);
