import { Router } from 'express';
import { resetTasks } from '../controllers/tasks.controller.js';

const router = Router();

router.post('/', resetTasks);

export default router;
