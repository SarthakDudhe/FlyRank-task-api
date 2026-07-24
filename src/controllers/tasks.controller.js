import * as TaskService from '../services/tasks.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getTasks = (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      priority: req.query.priority,
      assignedTo: req.query.assignedTo,
      search: req.query.search
    };
    
    const tasks = TaskService.getAllTasks(filters);
    return successResponse(res, 200, "Tasks retrieved successfully", tasks);
  } catch (error) {
    return errorResponse(res, 500, "Error retrieving tasks", [error.message]);
  }
};

export const getTaskById = (req, res) => {
  try {
    const task = TaskService.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    return successResponse(res, 200, "Task retrieved successfully", task);
  } catch (error) {
    return errorResponse(res, 500, "Error retrieving task", [error.message]);
  }
};

export const createTask = (req, res) => {
  try {
    const task = TaskService.createTask(req.body);
    return successResponse(res, 201, "Task created successfully", task);
  } catch (error) {
    return errorResponse(res, 500, "Error creating task", [error.message]);
  }
};

export const updateTask = (req, res) => {
  try {
    const task = TaskService.updateTask(req.params.id, req.body);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    return successResponse(res, 200, "Task updated successfully", task);
  } catch (error) {
    return errorResponse(res, 500, "Error updating task", [error.message]);
  }
};

export const deleteTask = (req, res) => {
  try {
    const deleted = TaskService.deleteTask(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return errorResponse(res, 500, "Error deleting task", [error.message]);
  }
};

export const updateTaskStatus = (req, res) => {
  try {
    const task = TaskService.updateTask(req.params.id, { status: req.body.status });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    return successResponse(res, 200, "Task status updated successfully", task);
  } catch (error) {
    return errorResponse(res, 500, "Error updating task status", [error.message]);
  }
};

export const getTaskStats = (req, res) => {
  try {
    const stats = TaskService.getStats();
    return successResponse(res, 200, "Task stats retrieved successfully", stats);
  } catch (error) {
    return errorResponse(res, 500, "Error retrieving task stats", [error.message]);
  }
};

export const resetTasks = (req, res) => {
  try {
    TaskService.resetTasks();
    return successResponse(res, 200, "Tasks reset to initial state successfully");
  } catch (error) {
    return errorResponse(res, 500, "Error resetting tasks", [error.message]);
  }
};
