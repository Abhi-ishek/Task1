import express from "express";
const app = express();
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { notFound,errorHandler,} from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDB();

const PORT= process.env.PORT || 8000;
 app.get("/", (req, res)=>{
    res.send("heiiiii") })


    // routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// error middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT , ()=>{
    console.log(`server is running on ${PORT}`);
})