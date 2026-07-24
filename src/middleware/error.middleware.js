import { errorResponse } from '../utils/response.js';

export const notFoundHandler = (req, res, next) => {
  errorResponse(res, 404, `Route not found - ${req.originalUrl}`);
};

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  errorResponse(res, statusCode, message, process.env.NODE_ENV === 'development' ? [err.stack] : []);
};
