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
  if (!user.user_id) {
    res.status(406).send("UserId required");
  }
  const tasks = await Task.find({ createdBy: user.user_id });
  res.status(200).json(tasks);
};

export const deleteTask = async (req, res) => {
  const id = req.param.id;
  if (id) {
    res.status(406).send("Id required");
  }
  const deleted = await Task.deleteOne({ id });
  console.log(deleted);
  res.status(200).send("Task Deleted Successfully.");
};

export const editTask = async (req, res) => {
  const {
    taskName,
    taskDescription,
    priority,
    status,
    progress,
    time,
    createdBy,
    _id,
  } = req.body;

  await Task.findByIdAndUpdate(_id, {
    name: taskName,
    description: taskDescription,
    priority,
    status,
    time,
    progress,
    createdBy,
    createdAt: new Date(Date.now()),
  });

  res.status(200).send("Task updated Successfully.");
};

export const updateTask = async (req, res) => {
  const id = req.params.id;

  const status = req.body.status;
  if (!id) {
    res.status(406).send("Id required");
  }

  const updateObject =
    status === "inprogress"
      ? { status, startTime: new Date(Date.now()) }
      : { status };

  await Task.findByIdAndUpdate(id, updateObject);

  res.status(200).send("status Updated.");
};

export const updateProgress = async (req, res) => {
  const id = req.params.id;

  const progress = req.body.progress;

  if (!id) {
    res.status(406).send("Id required");
  }

  await Task.findByIdAndUpdate(id, { progress });

  res.status(200).send("Progress Updated");
};
