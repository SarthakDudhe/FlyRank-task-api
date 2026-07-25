import { validationResult } from 'express-validator';
import { errorResponse } from '../utils/response.js';

// Reusable validation result checker middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, "Validation Error", errors.array());
  }
  next();
};
