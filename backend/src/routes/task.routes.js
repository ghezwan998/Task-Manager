import { getTasks, addTask, updateTask, updateTaskStatus, deleteTask } from "../controllers/task.controllers.js";
import protect from "../middleware/auth.js";
import express from 'express';

const router = express.Router();

router.get('/', protect, getTasks);
router.post('/', protect, addTask);
router.patch('/:taskId', protect, updateTask);
router.patch('/:taskId/status', protect, updateTaskStatus);
router.delete('/:taskId', protect, deleteTask);

export default router;
