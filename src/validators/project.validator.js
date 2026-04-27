const Joi = require("joi");

exports.createProjectSchema = Joi.object({
    name: Joi.string().min(1).required()
});
