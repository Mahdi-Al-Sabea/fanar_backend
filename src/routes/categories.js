import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import { authMiddleware, permit } from "../middlewares/auth.js";
import { UserRole } from "../Models/User.model.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);

router.post(
  "/",
  authMiddleware,
  permit(UserRole.SUPER_ADMIN, UserRole.TEAM_LEAD),
  createCategory
);
router.put(
  "/:id",
  authMiddleware,
  permit(UserRole.SUPER_ADMIN, UserRole.TEAM_LEAD),
  updateCategory
);
router.delete(
  "/:id",
  authMiddleware,
  permit(UserRole.SUPER_ADMIN, UserRole.TEAM_LEAD),
  deleteCategory
);

export default router;
