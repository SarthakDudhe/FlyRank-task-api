import { errorResponse } from '../utils/response.js';

export const notFoundHandler = (req, res, next) => {
  errorResponse(res, 404, `Route not found - ${req.originalUrl}`);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errorDetails = process.env.NODE_ENV === 'development' ? err.stack : (err.errors || err.message);

  // Mongoose Bad ObjectId (Cast Error)
  if (err.name === 'CastError') {
    message = `Invalid format for field ${err.path}`;
    statusCode = 400;
    errorDetails = err.message;
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    message = 'Duplicate field value entered';
    statusCode = 400;
    errorDetails = err.keyValue;
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    message = 'Validation Error';
    statusCode = 400;
    errorDetails = Object.values(err.errors).map(val => val.message);
  }

  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: errorDetails
  });
};
