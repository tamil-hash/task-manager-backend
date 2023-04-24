import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  priority: { type: String, enum: ["low", "medium", "high"] },
  status: {
    type: String,
    enum: ["todo", "inprogress", "completed"],
    default: "todo",
  },
  progress: { type: Number, default: 0 },
  time: { type: String },
  createdBy: { type: String },
  createdAt: { type: Date },
  startTime: { type: Date },
});

const Task = mongoose.model("Tasks", taskSchema);

export default Task;
