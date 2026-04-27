const ApiError = require("../utils/ApiError");

module.exports = (schema, property = "body") => (req, res, next) => {
    const target = req[property];
    const { error, value } = schema.validate(target, {
        abortEarly: false,
        allowUnknown: false
    });

    if (error) {
        return next(
            new ApiError(400, error.details[0].message, error.details.map((detail) => detail.message))
        );
    }

    req[property] = value;
    next();
};
