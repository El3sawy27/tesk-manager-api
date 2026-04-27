# Task Manager API

A Node.js REST API for managing users, projects, tasks, and comments.

## Features

- User registration and login with JWT authentication
- Project creation and membership-based access
- Task creation and pagination inside projects
- Commenting on tasks with access control
- Centralized error handling and consistent JSON response format
- Swagger documentation available at `/api-docs`

## Getting Started

### Prerequisites

- Node.js 24+ installed
- MongoDB database connection string

### Install

```bash
npm install
```

### Environment

Create a `.env` file in the project root using the example below:

```bash
cp .env.example .env
```

Then set the values:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run

```bash
npm run dev
```

Or start production mode:

```bash
npm start
```

## API Documentation

Detailed endpoint documentation is available in `docs/API.md`.

### Swagger UI

The project exposes Swagger UI at:

```
http://localhost:5000/api-docs
```

## Response Format

Successful responses use this structure:

```json
{
  "success": true,
  "data": { ... }
}
```

Error responses use this structure:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "errors": [ ... ]
}
```

## Testing Endpoints

A simple endpoint test script is available:

```bash
node test-endpoints.js
```

This script exercises the full flow:

1. Register user
2. Login
3. Create project
4. List projects
5. Create task
6. List tasks with pagination
7. Add comment

## Notes

- The API uses JWT bearer authentication for protected routes.
- Protected routes:
  - `POST /api/projects`
  - `GET /api/projects`
  - `POST /api/tasks/:projectId`
  - `GET /api/tasks/:projectId`
  - `POST /api/comments/:taskId`

- The Swagger spec is generated from route JSDoc comments.
- Make sure `logs/` and `.env` are not committed to GitHub.
