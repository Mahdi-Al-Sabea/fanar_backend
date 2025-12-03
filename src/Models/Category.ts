import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  title: string;
  description: string;
}

const categorySchema = new Schema<ICategory>(
  {
    title: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const Category = model<ICategory>("Category", categorySchema);