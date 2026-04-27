module.exports = (req, res, next) => {
    res.success = (data, statusCode = 200) => {
        return res.status(statusCode).json({
            success: true,
            data
        });
    };

    res.created = (data) => res.success(data, 201);

    res.fail = (message, statusCode = 500, errors = null) => {
        const response = {
            success: false,
            message
        };

        if (errors) response.errors = errors;

        return res.status(statusCode).json(response);
    };

    next();
};
