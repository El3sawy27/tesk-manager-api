const Joi = require("joi");

exports.projectIdSchema = Joi.object({
    projectId: Joi.string().hex().length(24).required()
});

exports.taskIdSchema = Joi.object({
    taskId: Joi.string().hex().length(24).required()
});

exports.taskListQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10)
});
