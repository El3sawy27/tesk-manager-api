const Task = require("../models/Task");
const Project = require("../models/Project");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

const ensureProjectAccess = async (projectId, userId) => {
    const project = await Project.findOne({
        _id: projectId,
        "members.user": userId
    });

    if (!project) {
        throw ApiError.notFound("Project not found or access denied");
    }

    return project;
};

exports.createTask = async (req, res) => {
    await ensureProjectAccess(req.params.projectId, req.user.id);

    const task = await Task.create({
        ...req.body,
        project: req.params.projectId
    });

    logger.info("Task created", {
        taskId: task._id.toString(),
        projectId: req.params.projectId,
        userId: req.user.id
    });

    res.created(task);
};

exports.getTasks = async (req, res) => {
    await ensureProjectAccess(req.params.projectId, req.user.id);

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const tasks = await Task.find({ project: req.params.projectId })
        .skip(skip)
        .limit(limit);

    const total = await Task.countDocuments({
        project: req.params.projectId
    });

    logger.info("Fetched project tasks", {
        projectId: req.params.projectId,
        userId: req.user.id,
        page,
        limit
    });

    res.success({
        total,
        page,
        pages: Math.ceil(total / limit),
        tasks
    });
};
