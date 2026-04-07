import mongoose from "mongoose";
import { MONGO_URI } from "./environment.js";


export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB Connected");
    }
    catch (error:any) {
        console.log(error);
        process.exit(1);
    }
}
