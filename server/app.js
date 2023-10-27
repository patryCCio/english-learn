import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// import routes
import authRoutes from "./routes/auth.js";
import testRoutes from "./routes/tests.js";

dotenv.config();

export const initServer = (port) => {

    // settings
    const PORT = port;

    const app = express();
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ limit: "50mb", extended: true }));
    app.use(cookieParser());
    app.use(cors({ credentials: true }));
    app.use((req, res, next) => {
        res.header("Authorization", true);
        next();
    });

    // routes
    app.use("/api/auth", authRoutes);
    app.use("/api/tests", testRoutes);
    app.listen(PORT, () => {
        console.log("The server is listening at " + PORT);
    }) || 8080;
}

export const getPort = async () => {
    return process.env.PORT;
} 
