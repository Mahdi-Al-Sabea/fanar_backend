import express from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import { authMiddleware, permit } from "../middlewares/auth.js";
import { UserRole } from "../Models/User.model.js";

const router = express.Router();

// Only superAdmin can access
router.get("/", authMiddleware, permit(UserRole.SUPER_ADMIN), getDashboard);

export default router;
