import Task from "../models/taskModel.js";

export const createTask = async (req, res) => {
  const { taskName, taskDescription, priority, time, createdBy } = req.body;
  if (!taskName && !taskDescription && !priority && !time && !createdBy) {
    return res.status(406).send("All Inputs are required");
  }
  await Task.create({
    name: taskName,
    description: taskDescription,
    priority,
    time,
    createdBy,
    createdAt: new Date(Date.now()),
  });
  res.status(200).send("Task created Sucessfully.");
};

export const fetchTasks = async (req, res) => {
  const user = req.user;
  console.log(user);
  if (!user.user_id) {
    res.status(406).send("UserId required");
  }
  const tasks = await Task.find({ createdBy: user.user_id });
  res.status(200).json(tasks);
};
