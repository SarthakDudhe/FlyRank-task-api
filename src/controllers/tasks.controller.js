import * as TaskService from '../services/tasks.service.js';
import { successResponse } from '../utils/response.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

export const getTasks = catchAsync(async (req, res, next) => {
  const filters = {
    status: req.query.status,
    priority: req.query.priority,
    assignedTo: req.query.assignedTo,
    search: req.query.search,
    sortBy: req.query.sortBy,
    order: req.query.order,
    page: req.query.page,
    limit: req.query.limit
  };
  
  // Awaiting the service call simulates a real DB interaction (e.g. MongoDB)
  const result = await TaskService.getAllTasks(filters);
  return successResponse(res, 200, "Tasks retrieved successfully", result);
});

export const getTaskById = catchAsync(async (req, res, next) => {
  const task = await TaskService.getTaskById(req.params.id);
  if (!task) {
    return next(new AppError("Task not found", 404));
  }
  return successResponse(res, 200, "Task retrieved successfully", task);
});

export const createTask = catchAsync(async (req, res, next) => {
  const task = await TaskService.createTask(req.body);
  return successResponse(res, 201, "Task created successfully", task);
});

export const updateTask = catchAsync(async (req, res, next) => {
  const task = await TaskService.updateTask(req.params.id, req.body);
  if (!task) {
    return next(new AppError("Task not found", 404));
  }
  return successResponse(res, 200, "Task updated successfully", task);
});

export const updateTaskStatus = catchAsync(async (req, res, next) => {
  const task = await TaskService.updateTask(req.params.id, { status: req.body.status });
  if (!task) {
    return next(new AppError("Task not found", 404));
  }
  return successResponse(res, 200, "Task status updated successfully", task);
});

export const deleteTask = catchAsync(async (req, res, next) => {
  const deleted = await TaskService.deleteTask(req.params.id);
  if (!deleted) {
    return next(new AppError("Task not found", 404));
  }
  return res.status(204).send();
});

export const getTaskStats = catchAsync(async (req, res, next) => {
  const stats = await TaskService.getStats();
  return successResponse(res, 200, "Task stats retrieved successfully", stats);
});

export const resetTasks = catchAsync(async (req, res, next) => {
  await TaskService.resetTasks();
  return successResponse(res, 200, "Tasks reset to initial state successfully");
});
