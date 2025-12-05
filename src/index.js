import express from "express";
import mongoose from "mongoose";
import { User } from "./Models/User.model.js";
import userRoutes from "./routes/users.js";
import projectRoutes from "./routes/projects.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || "";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
 
// Simple test route
app.get("/", (req, res) => {
  res.json({ success: true, message: "API is running 🚀" });
});

// MongoDB Connection
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🍃 MongoDB connected successfully");

    /* Optional test user creation
    const user = await User.create({
      email: "test@example.com",
      name: "Test User",
      role: "developer",
      password: "password123"
    }); 
    */

    const user = await User.findOne().lean();
    console.log("Found user:", user);

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
