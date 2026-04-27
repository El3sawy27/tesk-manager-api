const Joi = require("joi");

exports.createTaskSchema = Joi.object({
    title: Joi.string().required(),
    status: Joi.string().valid("todo", "in-progress", "done"),
    priority: Joi.string().valid("low", "medium", "high"),
    assignedTo: Joi.string().hex().length(24)
});