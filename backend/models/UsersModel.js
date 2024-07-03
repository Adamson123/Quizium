import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { CustomError } from "../errors/CustomError.js";


const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


UserSchema.methods.verifyPassword = async function (
  inputedPassword
) {
  if (!this.password) {
    throw new CustomError("Something went wrong", 500);
  }
  const isMatch = await bcrypt.compare(inputedPassword, this.password);
  return isMatch;
};


export const UsersModel = mongoose.model("users", UserSchema);
