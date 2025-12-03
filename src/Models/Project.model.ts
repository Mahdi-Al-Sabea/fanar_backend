import { Schema, model, Document, Types } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  dueDate: Date;
  dateCreated: Date;
  tasks: Types.ObjectId[];
  teamLeadId: Types.ObjectId;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    dateCreated: { type: Date, default: Date.now },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    teamLeadId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Project = model<IProject>("Project", projectSchema);
