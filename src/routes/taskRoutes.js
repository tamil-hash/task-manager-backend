import express from "express";

//controllers
import {
  createTask,
  fetchTasks,
  deleteTask,
  editTask,
  updateTask,
  updateProgress
} from "../controller/taskController.js";

//catcherror
import { catchAsync } from "../utils/utils.js";

const router = express.Router();

router.post("/create", catchAsync(createTask));
router.get("/fetch", catchAsync(fetchTasks));
router.post("/edit", catchAsync(editTask));
router.delete("/delete/:id", catchAsync(deleteTask));
router.post("/update/:id", catchAsync(updateTask));
router.post("/updateProgress/:id", catchAsync(updateProgress));

export default router;
