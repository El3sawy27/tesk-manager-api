const express = require("express");
const morgan = require("morgan");
const errorHandler = require("./middleware/error.middleware");
const limiter = require("./middleware/rateLimiter");
const responseHandler = require("./middleware/response.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const ApiError = require("./utils/ApiError");

const app = express();

app.use(express.json());
app.use(responseHandler);
app.use(morgan("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(limiter);

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/projects", require("./routes/project.routes"));
app.use("/api/tasks", require("./routes/task.routes"));
app.use("/api/comments", require("./routes/comment.routes"));

app.use((req, res, next) => next(ApiError.notFound("Route not found")));
app.use(errorHandler);

module.exports = app;