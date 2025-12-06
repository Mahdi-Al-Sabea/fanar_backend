import { Category } from "../Models/Category.model.js";


export const createCategory = async (req, res) => {
  try {
    if (req.user.role !== "teamLead") {
      return res.status(403).json({ error: "Only team leads can create categories" });
    }

    const category = await Category.create(req.body);
    res.status(201).json({ message: "Category created", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json({ error: "Category not found" });

    res.json({ category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateCategory = async (req, res) => {
  try {
    if (req.user.role !== "teamLead") {
      return res.status(403).json({ error: "Only team leads can update categories" });
    }

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Category not found" });

    res.json({ message: "Category updated", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    if (req.user.role !== "teamLead") {
      return res.status(403).json({ error: "Only team leads can delete categories" });
    }

    const deleted = await Category.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ error: "Category not found" });

    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
