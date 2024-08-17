import { UsersModel } from "../models/UsersModel.js";
import jwt from "jsonwebtoken";
import { CustomError } from "../errors/CustomError.js";

export const jwtCheckAndVerify = async (req, res, next) => {
    const token = req.cookies.token;
    if (!Object.keys(token).length)
        throw new CustomError("Authentication error", 401);

    const userId = jwt.verify(token, process.env.JWT_KEY);
    //const userIdTwo = userId;
    const userExist = await UsersModel.findById(userId.id);

    if (!userExist) throw new CustomError("404 user not found", 404);

    req.userId = userId.id;
    req.user = userExist;
    next();
};
