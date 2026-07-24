import { Router } from 'express';
import { 
  getTasks, 
  getTaskById, 
  createTask, 
  updateTask, 
  deleteTask,
  updateTaskStatus
} from '../controllers/tasks.controller.js';
import { 
  createTaskValidation, 
  updateTaskValidation, 
  updateTaskStatusValidation,
  validate 
} from '../middleware/validate.middleware.js';

const router = Router();

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTaskValidation, validate, createTask);
router.put('/:id', updateTaskValidation, validate, updateTask);
router.patch('/:id/status', updateTaskStatusValidation, validate, updateTaskStatus);
router.delete('/:id', deleteTask);

export default router;
