import { Router } from 'express';
import { 
  getTasks, 
  getTaskById, 
  createTask, 
  updateTask, 
  deleteTask 
} from '../controllers/tasks.controller.js';
import { 
  createTaskValidation, 
  updateTaskValidation, 
  validate 
} from '../middleware/validate.middleware.js';

const router = Router();

router.get('/', getTasks);
router.get('/:id', getTaskById);
router.post('/', createTaskValidation, validate, createTask);
router.put('/:id', updateTaskValidation, validate, updateTask);
router.delete('/:id', deleteTask);

export default router;
