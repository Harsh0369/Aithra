import express from 'express';
import cors from 'cors';
import { connectDB } from "./config/db.js"
import { PORT } from "./config/environment.js"

const app = express();

app.use(cors());
app.use(express.json());

const port = PORT || 5000;

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    }
    );
}).catch((error:any) => {
    console.log("Failed to connect to the database", error);
    process.exit(1);
});


