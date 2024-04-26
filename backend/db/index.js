import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const DB_URL = process.env.DB_URL;

export default async function connect() {
    try {
        await mongoose.connect(DB_URL);
        console.log("Connected to database successfully");
    } catch (error) {
        console.error("Failed to connect to database:", error.message);
    }
}
