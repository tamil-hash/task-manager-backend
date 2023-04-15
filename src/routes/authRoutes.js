import express from "express";

//controllers
import {
  registerUser,
  loginUser,
  refreshToken,
} from "../controller/authController.js";

//catcherror
import { catchAsync } from "../utils/utils.js";

const router = express.Router();

router.post("/signup", catchAsync(registerUser));
router.post("/login", catchAsync(loginUser));
router.post("/refresh", catchAsync(refreshToken));

export default router;
