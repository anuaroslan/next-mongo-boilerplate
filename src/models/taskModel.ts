import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  status: {
    type: Boolean,
    default: false,
  },
  taskName: {
    type: String,
    required: [true, "Please provide a task"],
  },
  description: {
    type: String,
    required: [false],
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

const Task = mongoose.models.tasks || mongoose.model("tasks", taskSchema);

export default Task;
