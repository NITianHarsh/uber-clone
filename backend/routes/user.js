import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} from "../controller/user.js";
import { body } from "express-validator";
import { authUser } from "../middlewares/auth.js";

const userRouter = express.Router();

// Register User route
userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);
// Login User route
userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginUser
);
userRouter.get("/profile", authUser, getUserProfile);
userRouter.get("/logout", authUser, logoutUser);

export default userRouter;
