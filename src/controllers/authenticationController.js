import { User,UserRole } from "../Models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

export const signUp = async (req, res) => {
  try {
    console.log("Signup request body:", req.body);
    const { name, email, role, password } = req.body;
    if (!name || !email || !password || !role) {
       res
        .status(400)
        .json({ message: "name, email, role and password are required" });
    }

          if (![UserRole.TEAM_LEAD, UserRole.DEVELOPER,UserRole.SUPER_ADMIN].includes(role)) {
             res.status(400).json({ error: "Invalid role for creation" });
          }


    if (await User.findOne({ email })) {
       res.status(409).json({ message: "Email already registered" });
    }

    const newUser = new User({ name, email, role, password });
    await newUser.save();

    const token = signToken({ id: newUser.id,name: newUser.name, email: newUser.email, role: newUser.role });
     res.status(201).json({
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      token,
    });
  } catch (e) {
     res.status(500).json({ message: "Server error", error: e.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Signin request body:");
    const user = await User.findOne({ email });
    if (!user)  res.status(401).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok)  res.status(401).json({ message: "Invalid credentials" });
    const token = signToken({ id: user.id, email: user.email, role: user.role });
     res.json({
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (e) {
     res.status(500).json({ message: "Server error", error: e.message });
  }
};



export const checkAuth = async (req, res) => {
    res.json({ message: "Hello from authentication controller!" });
}
