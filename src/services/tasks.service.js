import { Task, initialTasks } from '../models/tasks.model.js';

export const getAllTasks = async (filters = {}) => {
  const query = {};

  // Apply filters with case-insensitive matching
  if (filters.status) {
    query.status = new RegExp(`^${filters.status}$`, 'i');
  }
  if (filters.priority) {
    query.priority = new RegExp(`^${filters.priority}$`, 'i');
  }
  if (filters.assignedTo) {
    query.assignedTo = new RegExp(`^${filters.assignedTo}$`, 'i');
  }
  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } }
    ];
  }

  // Apply Sorting
  const sortBy = filters.sortBy || 'createdAt';
  const order = filters.order === 'asc' ? 1 : -1;

  // Apply Pagination
  const page = parseInt(filters.page, 10) || 1;
  const limit = parseInt(filters.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const total = await Task.countDocuments(query);
  const paginatedTasks = await Task.find(query)
    .sort({ [sortBy]: order })
    .skip(skip)
    .limit(limit);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data: paginatedTasks
  };
};

export const getTaskById = async (id) => {
  return await Task.findById(id);
};

export const createTask = async (taskData) => {
  const task = await Task.create(taskData);
  return task;
};

export const updateTask = async (id, updateData) => {
  const dataToUpdate = { ...updateData };

  // Automatically manage completed state based on status if completed flag wasn't explicitly set
  if (dataToUpdate.status === 'Done' && dataToUpdate.completed === undefined) {
    dataToUpdate.completed = true;
  } else if (dataToUpdate.status && dataToUpdate.status !== 'Done' && dataToUpdate.completed === undefined) {
    dataToUpdate.completed = false;
  }

  return await Task.findByIdAndUpdate(id, dataToUpdate, {
    new: true,
    runValidators: true
  });
};

export const deleteTask = async (id) => {
  const result = await Task.findByIdAndDelete(id);
  return !!result;
};

export const getStats = async () => {
  const [totalTasks, completedTasks, pendingTasks, highPriority, lowPriority] = await Promise.all([
    Task.countDocuments({}),
    Task.countDocuments({ completed: true }),
    Task.countDocuments({ completed: false }),
    Task.countDocuments({ priority: 'High' }),
    Task.countDocuments({ priority: 'Low' })
  ]);

  return {
    totalTasks,
    completedTasks,
    pendingTasks,
    highPriority,
    lowPriority
  };
};

export const resetTasks = async () => {
  await Task.deleteMany({});
  const tasks = await Task.insertMany(initialTasks);
  return tasks;
};
