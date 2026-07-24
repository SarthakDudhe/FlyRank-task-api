import { body, validationResult } from 'express-validator';
import { errorResponse } from '../utils/response.js';

// Reusable validation result checker
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, "Validation Error", errors.array());
  }
  next();
};

export const createTaskValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isString().withMessage('Description must be a string'),
  body('priority')
    .trim()
    .notEmpty().withMessage('Priority is required')
    .isIn(['Low', 'Medium', 'High']).withMessage('Priority must be Low, Medium, or High'),
  body('assignedTo')
    .trim()
    .notEmpty().withMessage('AssignedTo is required')
    .isString().withMessage('AssignedTo must be a string'),
];

export const updateTaskValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty string'),
  body('description').optional().trim().notEmpty().withMessage('Description cannot be empty string'),
  body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Priority must be Low, Medium, or High'),
  body('status').optional().isIn(['Pending', 'In Progress', 'Done']).withMessage('Invalid status'),
  body('assignedTo').optional().trim().notEmpty().withMessage('AssignedTo cannot be empty string'),
  body('completed').optional().isBoolean().withMessage('Completed must be a boolean')
];
