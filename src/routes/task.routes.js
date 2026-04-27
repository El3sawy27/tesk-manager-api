const router = require("express").Router();
const ctrl = require("../controllers/task.controller");
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate");
const { createTaskSchema } = require("../validators/task.validator");
const { projectIdSchema, taskListQuerySchema } = require("../validators/params.validator");

router.use(auth);

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

/**
 * @swagger
 * /api/tasks/{projectId}:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Create a task inside a project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskCreate'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/:projectId", validate(projectIdSchema, "params"), validate(createTaskSchema), ctrl.createTask);

/**
 * @swagger
 * /api/tasks/{projectId}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Get tasks for a project
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: projectId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         description: 'Page number for pagination (default: 1)'
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         description: 'Number of tasks per page (default: 10)'
 *     responses:
 *       200:
 *         description: Paginated task list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get(
    "/:projectId",
    validate(projectIdSchema, "params"),
    validate(taskListQuerySchema, "query"),
    ctrl.getTasks
);

module.exports = router;