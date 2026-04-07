import express from 'express';
import cors from 'cors';
import {connectDB} from "./config/db.js"

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    }
    );
}).catch((error:any) => {
    console.log("Failed to connect to the database", error);
    process.exit(1);
});


