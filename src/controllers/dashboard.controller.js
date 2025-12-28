import {User} from "../Models/User.model.js";
import {Project} from "../Models/Project.model.js";
import {Task} from "../Models/Task.model.js";

export const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalTasks = await Task.countDocuments();

    const tasksByStatus = await Task.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    res.json({
      totalUsers,
      totalProjects,
      totalTasks,
      tasksByStatus
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
