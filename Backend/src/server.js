import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express"
import { connectDB } from "./lib/db.js";
import userRoutes from "./routes/userRoute.js";
import authRoutes from "./routes/authRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import songRoutes from "./routes/songRoute.js";
import albumRoutes from "./routes/albumRoute.js";
import statRoutes from "./routes/statRoute.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json());
app.use(clerkMiddleware()); // adds auth

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB()
});


// 54:29