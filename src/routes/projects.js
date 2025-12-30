import express from "express";
import { createProject, getProjects, updateProject, deleteProject } from "../controllers/projectController.js";
import { authMiddleware, permit } from "../middlewares/auth.js";
import { UserRole } from "../Models/User.model.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", permit(UserRole.TEAM_LEAD , UserRole.SUPER_ADMIN), createProject);
router.get("/", permit(UserRole.SUPER_ADMIN, UserRole.TEAM_LEAD), getProjects);
router.put("/:id", permit(UserRole.TEAM_LEAD), updateProject);
router.delete("/:id", permit(UserRole.TEAM_LEAD), deleteProject);

export default router;
