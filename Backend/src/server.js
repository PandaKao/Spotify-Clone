import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express"
import { connectDB } from "./lib/db.js";
import fileUpload from "expres-fileupload";
import path from "path";

import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import songRoutes from "./routes/songRoute.js";
import albumRoutes from "./routes/albumRoute.js";
import statRoutes from "./routes/statRoute.js";


dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT;

app.use(express.json());
app.use(clerkMiddleware()); // adds auth

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp'),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max file size
    },
}));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message })
})

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});