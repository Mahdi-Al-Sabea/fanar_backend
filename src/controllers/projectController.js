import { Project } from "../Models/Project.model.js";


export const createProject = async (req, res) => {
  try {
    const { title, description, dueDate, teamLeadId } = req.body;

   
    const assignedTeamLeadId = req.user.role === "teamLead" ? req.user._id : teamLeadId;

    const project = await Project.create({
      title,
      description,
      dueDate,
      teamLeadId: assignedTeamLeadId,
    });

    return res.status(201).json(project);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    let projects;

    if (req.user.role === "superAdmin") {
      projects = await Project.find().populate("teamLeadId", "name email");
    } else if (req.user.role === "teamLead") {
      projects = await Project.find({ teamLeadId: req.user._id }).populate("teamLeadId", "name email");
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }

    return res.json(projects);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("teamLeadId", "name email");

    if (!updatedProject) return res.status(404).json({ message: "Project not found" });

    return res.json(updatedProject);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });

    return res.json({ message: "Project deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
