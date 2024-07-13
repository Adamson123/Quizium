import mongoose from "mongoose";
import app from "../index.js";

beforeAll(async () => {
    // Increase Mongoose's timeout settings
    // mongoose.set("bufferCommands", false);
    //mongoose.set("bufferTimeoutMS", 20000);

    // Connect to the test database
    await mongoose.connect("mongodb://localhost:27017/quizium-test");
});

beforeAll(async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        await collection.deleteMany();
    }
});

afterAll(async () => {
    await mongoose.disconnect();
});

export default app;
