import { Router } from 'express';
import { getTaskStats } from '../controllers/tasks.controller.js';

const router = Router();

router.get('/', getTaskStats);

export default router;
