const Comment = require("../models/Comment");
const Task = require("../models/Task");
const Project = require("../models/Project");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

const ensureTaskAccess = async (taskId, userId) => {
    const task = await Task.findById(taskId);
    if (!task) {
        throw ApiError.notFound("Task not found");
    }

    const project = await Project.findOne({
        _id: task.project,
        "members.user": userId
    });

    if (!project) {
        throw ApiError.unauthorized("Access denied");
    }

    return task;
};

exports.addComment = async (req, res) => {
    await ensureTaskAccess(req.params.taskId, req.user.id);

    const comment = await Comment.create({
        content: req.body.content,
        task: req.params.taskId,
        user: req.user.id
    });

    logger.info("Comment added", {
        commentId: comment._id.toString(),
        taskId: req.params.taskId,
        userId: req.user.id
    });

    res.created(comment);
};
