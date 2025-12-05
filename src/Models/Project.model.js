
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    dateCreated: { type: Date, default: Date.now },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    teamLeadId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
