const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Manager API",
            version: "1.0.0",
            description: "REST API for managing users, projects, tasks, and comments.",
            contact: {
                name: "Task Manager API",
                email: "support@example.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local development server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                ApiResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean" },
                        data: { type: "object" }
                    }
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean" },
                        message: { type: "string" },
                        errors: {
                            type: "array",
                            items: { type: "string" }
                        }
                    }
                },
                UserRegister: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        name: { type: "string" },
                        email: { type: "string", format: "email" },
                        password: { type: "string" }
                    }
                },
                UserLogin: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: { type: "string", format: "email" },
                        password: { type: "string" }
                    }
                },
                ProjectCreate: {
                    type: "object",
                    required: ["name"],
                    properties: {
                        name: { type: "string" }
                    }
                },
                TaskCreate: {
                    type: "object",
                    required: ["title"],
                    properties: {
                        title: { type: "string" },
                        status: { type: "string", enum: ["todo", "in-progress", "done"] },
                        priority: { type: "string", enum: ["low", "medium", "high"] },
                        assignedTo: { type: "string" }
                    }
                },
                CommentCreate: {
                    type: "object",
                    required: ["content"],
                    properties: {
                        content: { type: "string" }
                    }
                }
            }
        }
    },
    apis: ["./src/routes/*.js"]
};

module.exports = swaggerJsdoc(options);