
import mongoose from "mongoose";


export const UserRole = {
  SUPER_ADMIN: "superAdmin",
  TEAM_LEAD: "teamLead",
  DEVELOPER: "developer",
};

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    password: { type: String, required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
