import mongoose from "mongoose";

const ImagesIdSchema = new mongoose.Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "upload.files",
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
});

export const ImagesIdModel = mongoose.model("imagesId", ImagesIdSchema);
