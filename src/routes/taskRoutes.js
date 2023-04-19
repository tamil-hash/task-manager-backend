import express from "express";

//controllers
import { createTask, fetchTasks } from "../controller/taskController.js";

//catcherror
import { catchAsync } from "../utils/utils.js";

const router = express.Router();

router.post("/create", catchAsync(createTask));
router.get("/fetch", catchAsync(fetchTasks));

export default router;
