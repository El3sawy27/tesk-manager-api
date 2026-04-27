const router = require("express").Router();
const ctrl = require("../controllers/comment.controller");
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate");
const { addCommentSchema } = require("../validators/comment.validator");
const { taskIdSchema } = require("../validators/params.validator");

router.use(auth);

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management endpoints
 */

/**
 * @swagger
 * /api/comments/{taskId}:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Add a comment to a task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentCreate'
 *     responses:
 *       201:
 *         description: Comment added successfully
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
router.post("/:taskId", validate(taskIdSchema, "params"), validate(addCommentSchema), ctrl.addComment);

module.exports = router;