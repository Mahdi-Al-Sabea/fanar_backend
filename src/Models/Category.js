// Models/Category.model.js
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);
