import { CustomError } from "../errors/CustomError.js";
export const errorMiddleware = (err, req, res, next) => {
    if (err instanceof CustomError)
        return res.status(err.status).json({ err: err.message });

    console.log("from error middleware ❗", err.message);
    return res.status(500).json({ err: "Something went wrong" });
};
