class ApiError extends Error {
    constructor(statusCode, message, errors = null) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = "Bad Request", errors = null) {
        return new ApiError(400, message, errors);
    }

    static unauthorized(message = "Unauthorized") {
        return new ApiError(401, message);
    }

    static notFound(message = "Not Found") {
        return new ApiError(404, message);
    }

    static internal(message = "Internal Server Error") {
        return new ApiError(500, message);
    }
}

module.exports = ApiError;
