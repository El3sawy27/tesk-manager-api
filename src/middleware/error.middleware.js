const ApiError = require("../utils/ApiError");

module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;

    const response = {
        success: false,
        statusCode,
        message: err.message || "Internal Server Error"
    };

    if (err.errors) {
        response.errors = err.errors;
    }

    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    console.error(err);

    res.status(statusCode).json(response);
};
