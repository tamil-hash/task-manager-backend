import express from "express";

//controllers
import { registerUser, loginUser } from "../controller/authController.js";

//catcherror
import {catchAsync} from "../utils/utils.js";

const router = express.Router();

router.post("/register", catchAsync(registerUser));
router.post("/login", catchAsync(loginUser));

export default router;
