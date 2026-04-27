const fs = require("fs");
const path = require("path");
const { createLogger, transports, format } = require("winston");

const logDir = path.resolve(__dirname, "../../logs");
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: path.join(logDir, "app.log") })
    ]
});

module.exports = logger;
