import { Task } from "../Models/Task.model.js";
import { Project } from "../Models/Project.model.js";
import { UserRole } from "../Models/User.model.js";

export const createTask = async (req, res) => {
  try {
    const user = req.user;


    if (user.role !== UserRole.SUPER_ADMIN && user.role !== UserRole.TEAM_LEAD) {
      return res.status(403).json({ error: "Only admin/teamlead can create tasks" });
    }


    if (user.role === UserRole.TEAM_LEAD) {
      const project = await Project.findById(req.body.projectId);
      if (!project || project.teamLeadId.toString() !== user._id.toString()) {
        return res.status(403).json({ error: "You do not manage this project" });
      }
    }

    const task = await Task.create(req.body);
    return res.json(task);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const user = req.user;
    const { projectId } = req.query;

    let filter = {};

    // Role-based filtering
    if (user.role === UserRole.SUPER_ADMIN) {
      filter = {};
    } else if (user.role === UserRole.TEAM_LEAD) {
      filter.teamLeadId = user._id;
    } else {
      filter.userId = user._id;
    }

    // Optional project filter
    if (projectId) {
      filter.projectId = projectId;
    }

    const tasks = await Task.find(filter).populate("userId", "name email role").populate("teamLeadId", "name email role");

    return res.json(tasks);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const user = req.user;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ error: "Task not found" });


    if (user.role === UserRole.SUPER_ADMIN) {
      const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(updated);
    }


    if (user.role === UserRole.TEAM_LEAD) {
      if (task.teamLeadId.toString() !== user._id.toString()) {
        return res.status(403).json({ error: "Not your project" });
      }
      const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(updated);
    }


    if (user.role === UserRole.DEVELOPER) {
      if (task.userId.toString() !== user._id.toString()) {
        return res.status(403).json({ error: "Not your task" });
      }

      if (!req.body.status) {
        return res.status(403).json({ error: "Developers may only update task status" });
      }

      const updated = await Task.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );

      return res.json(updated);
    }

    return res.status(403).json({ error: "Not allowed" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const user = req.user;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ error: "Task not found" });

    if (user.role === UserRole.SUPER_ADMIN) {
      await task.deleteOne();
      return res.json({ message: "Task deleted" });
    }

    if (user.role === UserRole.TEAM_LEAD) {
      if (task.teamLeadId.toString() !== user._id.toString()) {
        return res.status(403).json({ error: "Not your project/task" });
      }
      await task.deleteOne();
      return res.json({ message: "Task deleted" });
    }

    return res.status(403).json({ error: "Developers cannot delete tasks" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
