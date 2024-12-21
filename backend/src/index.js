import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

// Middleware
const corsOptions = {
  origin: "http://localhost:5173", // Allow your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow credentials (cookies, etc.)
};
app.use(cors(corsOptions)); // CORS middleware
app.use(express.json({ limit: "10mb" })); // JSON body parser with payload limit
app.use(express.urlencoded({ limit: "10mb", extended: true })); // URL-encoded parser
app.use(cookieParser()); // Cookie parser

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDb();
});
