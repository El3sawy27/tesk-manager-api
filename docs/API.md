# API Reference

## Authentication

### Register

- `POST /api/auth/register`
- Body:
  - `name` (string, required)
  - `email` (string, required)
  - `password` (string, required)

Example request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123!"
}
```

Success response:

```json
{
  "success": true,
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "_id": "..."
  }
}
```

### Login

- `POST /api/auth/login`
- Body:
  - `email` (string, required)
  - `password` (string, required)

Example request body:

```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

Success response:

```json
{
  "success": true,
  "data": {
    "token": "<jwt-token>"
  }
}
```

## Projects

### Create Project

- `POST /api/projects`
- Headers:
  - `Authorization: Bearer <jwt-token>`
- Body:
  - `name` (string, required)

Example request body:

```json
{
  "name": "Project Alpha"
}
```

Success response:

```json
{
  "success": true,
  "data": {
    "name": "Project Alpha",
    "owner": "<userId>",
    "members": [ ... ]
  }
}
```

### List Projects

- `GET /api/projects`
- Headers:
  - `Authorization: Bearer <jwt-token>`

Success response:

```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Project Alpha",
      "owner": "...",
      "members": [ ... ]
    }
  ]
}
```

## Tasks

### Create Task

- `POST /api/tasks/{projectId}`
- Headers:
  - `Authorization: Bearer <jwt-token>`
- Path params:
  - `projectId` (string, required)
- Body:
  - `title` (string, required)
  - `status` (string, optional, one of `todo`, `in-progress`, `done`)
  - `priority` (string, optional, one of `low`, `medium`, `high`)
  - `assignedTo` (string, optional)

Example request body:

```json
{
  "title": "Finish report",
  "status": "todo",
  "priority": "medium"
}
```

Success response:

```json
{
  "success": true,
  "data": {
    "title": "Finish report",
    "status": "todo",
    "priority": "medium",
    "project": "<projectId>"
  }
}
```

### List Tasks

- `GET /api/tasks/{projectId}`
- Headers:
  - `Authorization: Bearer <jwt-token>`
- Path params:
  - `projectId` (string, required)
- Query params:
  - `page` (integer, optional, default: 1)
  - `limit` (integer, optional, default: 10)

Success response:

```json
{
  "success": true,
  "data": {
    "total": 1,
    "page": 1,
    "pages": 1,
    "tasks": [ ... ]
  }
}
```

## Comments

### Add Comment

- `POST /api/comments/{taskId}`
- Headers:
  - `Authorization: Bearer <jwt-token>`
- Path params:
  - `taskId` (string, required)
- Body:
  - `content` (string, required)

Example request body:

```json
{
  "content": "This is a test comment."
}
```

Success response:

```json
{
  "success": true,
  "data": {
    "content": "This is a test comment.",
    "task": "<taskId>",
    "user": "<userId>"
  }
}
```

## Error Response

Validation and runtime errors return:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation error message",
  "errors": ["Detailed error 1", "Detailed error 2"]
}
```
