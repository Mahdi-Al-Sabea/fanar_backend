import express from "express";
import {
  signIn,
  signUp,
  checkAuth
} from "../controllers/authenticationController.js";
import { authMiddleware, permit, } from "../middlewares/auth.js";
import { UserRole } from "../Models/User.model.js";

const router = express.Router();




router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/checkAuth", authMiddleware, checkAuth);

router.get("/checkAuthAdmin", authMiddleware, permit(UserRole.SUPER_ADMIN), checkAuth);
router.get("/checkAuthDeveloper", authMiddleware, permit(UserRole.DEVELOPER,UserRole.TEAM_LEAD), checkAuth);


export default router;