import { Schema, model, Document, Types } from "mongoose";

export enum UserRole {
  TEAM_LEAD = "teamLead",
  DEVELOPER = "developer",
}

export interface IUser extends Document {
  email: string;
  name: string;
  role: UserRole;
  password: string;
  projects: Types.ObjectId[];
  tasks: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    password: { type: String, required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
