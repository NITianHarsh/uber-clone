import { validationResult } from "express-validator";
import userModel from "../models/user.js";
import createUser from "../services/user.js";
import blacklistModel from "../models/blacklist.js";

export const registerUser = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    // Check if the email already exists
    // const existingUser = await userModel.findOne({ email });
    // if (existingUser) {
    //   return res.status(400).json({ error: "Email already registered" });
    // }

    // Hash the password
    const hashedPassword = await userModel.hashPassword(password);

    // Create a new user
    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    // Generate authentication token
    const token = user.generateAuthToken();

    // Send response
    res.status(201).json({ token, user });
    console.log("User registered");
  } catch (error) {
    next(error); // Pass the error to Express error handler
  }
};

export const loginUser = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if the email exists
    const user = await userModel.findOne({ email }).select("+password"); // humne schema me passowrd select off kiya tha, so agar direcly findOne krenge to sirf Email ayega, so we give additional ki password bhi leke aao
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = user.generateAuthToken();
    res.cookie("token", token); // so, we saved token in a cookie

    // Send response
    res.status(200).json({ token, user });
    console.log("User Logged In");
  } catch (error) {
    next(error); // Pass error to Express error-handling middleware
  }
};

export const getUserProfile = async (req, res, next) => {
  // since this will be seen only to that person..so using a middleware
  res.status(200).json(req.user); // Check it
  console.log("User got the profile");
};

export const logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklistModel.create({ token });
  res.status(200).json({ message: "Logged out" });
  console.log("User logged out");
};
