import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import projectRoutes from "./routes/projects.js";
import taskRoutes from "./routes/tasks.js";
import categoryRoutes from "./routes/categories.js";
import AuthRoutes from "./routes/authentication.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/api/auth", AuthRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/categories" , categoryRoutes);
// Simple test route
app.get("/", (req, res) => {
  res.json({ success: true, message: "API is running 🚀" });
});

// MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🍃 MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // Stop the server if DB fails
  }
}

// Start server
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
