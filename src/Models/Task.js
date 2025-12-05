
import mongoose from "mongoose";


export const TaskStatus = {
  TODO: "todo",
  IN_PROGRESS: "inProgress",
  DONE: "done",
};

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.TODO,
    },
    dateCreated: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },

    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    teamLeadId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
