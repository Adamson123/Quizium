///import { connectToProfileImagesCol } from "./config/profileImagesCol.js";
import { connectToDB } from "./config/db.js";
import server from "./index.js";
const PORT = process.env.PORT || 3002;
const start = async () => {
    try {
        await connectToDB();
        //  connectToProfileImagesCol();
        server.listen(PORT, () => {
            console.log(`Quizium server is on!!!✨ ./backend/server ` + PORT);
        });
    } catch (error) {
        console.error(error);
    }
};

start();
