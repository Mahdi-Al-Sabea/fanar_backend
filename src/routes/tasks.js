import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../controllers/tasksController.js";

import { authMiddleware, permit } from "../middlewares/auth.js";
import { UserRole } from "../Models/User.model.js";

const router = express.Router();


router.use(authMiddleware);



router.post("/", permit(UserRole.SUPER_ADMIN, UserRole.TEAM_LEAD), createTask);


router.get("/", getTasks);


router.put("/:id", updateTask);


router.delete("/:id", permit(UserRole.SUPER_ADMIN, UserRole.TEAM_LEAD), deleteTask );

export default router;
