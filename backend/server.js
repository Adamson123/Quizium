///import { connectToProfileImagesCol } from "./config/profileImagesCol.js";
import { connectToDB } from "./config/db.js";
import app from "./index.js";

const start = async () => {
    try {
        await connectToDB();
        //  connectToProfileImagesCol();
        app.listen(3002, () => {
            console.log("Quizium server is on!!! ./backend/server 3002");
        });
    } catch (error) {
        console.error(error);
    }
};

start();
