import { Schema, model, Document, Types } from "mongoose";

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "inProgress",
  DONE = "done",
}

export interface ITask extends Document {
  title: string;
  description: string;
  status: TaskStatus;
  dateCreated: Date;
  dueDate: Date;
  categoryId: Types.ObjectId;
  userId: Types.ObjectId;
  projectId: Types.ObjectId;
  teamLeadId: Types.ObjectId;
}

const taskSchema = new Schema<ITask>(
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

    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    teamLeadId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", taskSchema);
