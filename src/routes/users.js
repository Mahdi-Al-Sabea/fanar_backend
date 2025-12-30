import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";
import { authMiddleware, permit } from "../middlewares/auth.js";
import { UserRole } from "../Models/User.model.js";
import {User} from "../Models/User.model.js"


const router = express.Router();

router.use(authMiddleware);

router.post("/", permit(UserRole.SUPER_ADMIN), createUser);
router.get("/", permit(UserRole.SUPER_ADMIN), getUsers);
router.put("/:id", permit(UserRole.SUPER_ADMIN), updateUser);
router.delete("/:id", permit(UserRole.SUPER_ADMIN), deleteUser);

// GET /users/teamleaders
router.get("/teamleaders", permit(UserRole.SUPER_ADMIN), async (req, res) => {
  try {
    const teamLeaders = await User.find({ role: UserRole.TEAM_LEAD });
    res.status(200).json(teamLeaders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
