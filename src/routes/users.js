import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";
import { authMiddleware, permit } from "../middlewares/auth.js";
import { UserRole } from "../Models/User.model.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", permit(UserRole.SUPER_ADMIN), createUser);
router.get("/", permit(UserRole.SUPER_ADMIN), getUsers);
router.put("/:id", permit(UserRole.SUPER_ADMIN), updateUser);
router.delete("/:id", permit(UserRole.SUPER_ADMIN), deleteUser);
export default router;
