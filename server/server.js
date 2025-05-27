import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookies from "cookie-parser";
import dotenv from "dotenv";
import { corsOrigins } from "./configs/index.js";
import { DOWNLOAD_PLAYLIST, DOWNLOAD_STREAM, DOWNLOAD_VIDEO } from "./controllers/youtube.controller.js";

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
app.get("/api/stream", DOWNLOAD_STREAM);
app.post("/api/playlist", DOWNLOAD_PLAYLIST);
app.use("/*", (req, res) => res.status(400).json({ method: req.method, url: req.url, message: "Path Not Exist." }));

// Server Listenning
app.listen(5000);
