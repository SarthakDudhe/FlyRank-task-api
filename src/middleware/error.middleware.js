import { errorResponse } from '../utils/response.js';

export const notFoundHandler = (req, res, next) => {
  errorResponse(res, 404, `Route not found - ${req.originalUrl}`);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errors: process.env.NODE_ENV === 'development' ? [err.stack] : (err.errors || [])
  });
};
