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
  taskIdValidation
} from '../validators/tasks.validator.js';
import { validate } from '../middleware/validate.middleware.js';

const router = Router();

router.get('/', getTasks);
router.get('/:id', taskIdValidation, validate, getTaskById);
router.post('/', createTaskValidation, validate, createTask);
router.put('/:id', taskIdValidation, updateTaskValidation, validate, updateTask);
router.patch('/:id/status', taskIdValidation, updateTaskStatusValidation, validate, updateTaskStatus);
router.delete('/:id', taskIdValidation, validate, deleteTask);

export default router;
