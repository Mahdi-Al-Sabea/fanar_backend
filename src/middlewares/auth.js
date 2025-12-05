import { User } from "../Models/User.model.js";


export const authMiddleware = async (req, res, next) => {
  const userId = req.header("x-user-id");
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const user = await User.findById(userId);
  if (!user) return res.status(401).json({ error: "User not found" });

  req.user = user;
  next();
};


export const permit = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: Access denied" });
    }
    next();
  };
};


