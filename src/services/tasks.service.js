import { TaskModel } from '../models/tasks.model.js';

export const getAllTasks = (filters = {}) => {
  let tasks = TaskModel.findAll();
  
  // Apply filters
  if (filters.status) {
    tasks = tasks.filter(t => t.status.toLowerCase() === filters.status.toLowerCase());
  }
  if (filters.priority) {
    tasks = tasks.filter(t => t.priority.toLowerCase() === filters.priority.toLowerCase());
  }
  if (filters.assignedTo) {
    tasks = tasks.filter(t => t.assignedTo.toLowerCase() === filters.assignedTo.toLowerCase());
  }
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    tasks = tasks.filter(t => 
      t.title.toLowerCase().includes(searchLower) || 
      t.description.toLowerCase().includes(searchLower)
    );
  }
  
  return tasks;
};

export const getTaskById = (id) => {
  return TaskModel.findById(id);
};

export const createTask = (taskData) => {
  return TaskModel.create(taskData);
};

export const updateTask = (id, updateData) => {
  return TaskModel.update(id, updateData);
};

export const deleteTask = (id) => {
  return TaskModel.delete(id);
};

export const getStats = () => {
  const tasks = TaskModel.findAll();
  return {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.completed).length,
    pendingTasks: tasks.filter(t => !t.completed).length,
    highPriority: tasks.filter(t => t.priority === 'High').length,
    lowPriority: tasks.filter(t => t.priority === 'Low').length
  };
};

export const resetTasks = () => {
  return TaskModel.reset();
};
