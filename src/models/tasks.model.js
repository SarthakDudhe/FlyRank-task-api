import mongoose from 'mongoose';

export const initialTasks = [
  {
    title: "Implement Community Feed",
    description: "Build infinite scrolling feed for FlyRank AI platform",
    priority: "High",
    status: "In Progress",
    assignedTo: "Sarthak Dudhe",
    completed: false
  },
  {
    title: "Setup User Authentication",
    description: "Integrate JWT based auth system",
    priority: "High",
    status: "Pending",
    assignedTo: "Backend Team",
    completed: false
  },
  {
    title: "Design Landing Page",
    description: "Create responsive UI for FlyRank AI home page",
    priority: "Medium",
    status: "Done",
    assignedTo: "Frontend Team",
    completed: true
  }
];

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    priority: {
      type: String,
      required: [true, 'Priority is required'],
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: 'Priority must be Low, Medium, or High'
      }
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'In Progress', 'Done'],
        message: 'Invalid status'
      },
      default: 'Pending'
    },
    assignedTo: {
      type: String,
      required: [true, 'AssignedTo is required'],
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Add Indexes for common query fields
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ assignedTo: 1 });

// Transform output to replace _id with id and remove __v
taskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

taskSchema.set('toObject', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const Task = mongoose.model('Task', taskSchema);
export default Task;
