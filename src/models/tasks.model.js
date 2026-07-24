import { v4 as uuidv4 } from 'uuid';

// Seed initial realistic tasks
const initialTasks = [
  {
    id: uuidv4(),
    title: "Implement Community Feed",
    description: "Build infinite scrolling feed for Antigravity platform",
    priority: "High",
    status: "In Progress",
    assignedTo: "Sarthak Dudhe",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: "Setup User Authentication",
    description: "Integrate JWT based auth system",
    priority: "High",
    status: "Pending",
    assignedTo: "Backend Team",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: "Design Landing Page",
    description: "Create responsive UI for Antigravity home page",
    priority: "Medium",
    status: "Done",
    assignedTo: "Frontend Team",
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// In-memory store
let tasks = [...initialTasks];

export const TaskModel = {
  findAll: () => tasks,
  findById: (id) => tasks.find(t => t.id === id),
  create: (taskData) => {
    const newTask = {
      id: uuidv4(),
      ...taskData,
      status: taskData.status || "Pending",
      completed: taskData.completed || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    return newTask;
  },
  update: (id, updateData) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return null;
    
    tasks[index] = {
      ...tasks[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    // Automatically manage completed state based on status if completed flag wasn't explicitly set
    if (updateData.status === 'Done' && updateData.completed === undefined) {
      tasks[index].completed = true;
    } else if (updateData.status && updateData.status !== 'Done' && updateData.completed === undefined) {
      tasks[index].completed = false;
    }
    
    return tasks[index];
  },
  delete: (id) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },
  reset: () => {
    tasks = [...initialTasks];
    return tasks;
  }
};
