const Project = require("../models/Project");
const logger = require("../utils/logger");

exports.createProject = async (req, res) => {
    const project = await Project.create({
        name: req.body.name,
        owner: req.user.id,
        members: [{ user: req.user.id, role: "admin" }]
    });
    logger.info("Project created");

    res.created(project);
};

exports.getProjects = async (req, res) => {
    const projects = await Project.find({
        "members.user": req.user.id
    });

    res.success(projects);
};
