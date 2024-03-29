import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookies from "cookie-parser";
import dotenv from "dotenv";
import { corsOrigins, DBconnection } from "./configs/index.js";
import { DOWNLOAD_PLAYLIST, DOWNLOAD_VIDEO } from "./controllers/youtube.controller.js";

// Configs
export const app = express();
dotenv.config();
app.use(cors(corsOrigins));
app.use(cookies());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.post("/api/video", DOWNLOAD_VIDEO);
app.post("/api/playlist", DOWNLOAD_PLAYLIST);
app.use("/*", (req, res) =>
	res.status(400).json({ method: req.method, url: req.url, message: "Path Not Exist." })
);

// Mongo
DBconnection();
mongoose.connection.on("connected", () => console.log(`Server Connected 🚀`));
mongoose.connection.on("disconnected", () => console.log(`Server Disconnected 😢`));

// Server Listenning
app.listen(5000);
