import { validationResult } from "express-validator";
import captainModel from "../models/captain.js";
import createCaptain from "../services/captain.js";
import blacklistModel from "../models/blacklist.js";

export const registerCaptain = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    // Check if the email already exists
    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await captainModel.hashPassword(password);

    // Create a new captain
    const captain = await createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });
    // Generate authentication token
    const token = captain.generateAuthToken();

    // Send response
    res.status(201).json({ token, captain });
  } catch (error) {
    next(error); // Pass the error to Express error handler
  }
};

export const loginCaptain = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if the email exists
    const captain = await captainModel.findOne({ email }).select("+password"); // humne schema me passowrd select off kiya tha, so agar direcly findOne krenge to sirf Email ayega, so we give additional ki password bhi leke aao
    if (!captain) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = captain.generateAuthToken();
    res.cookie("token", token); // so, we saved token in a cookie

    // Send response
    res.status(200).json({ token, captain });
  } catch (error) {
    next(error); // Pass error to Express error-handling middleware
  }
};

export const getCaptainProfile = async (req, res, next) => {
  // since this will be seen only to that person..so using a middleware
  res.status(200).json(req.captain); // Check it
  console.log("captain got the profile");
};

export const logoutCaptain = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklistModel.create({ token });
  res.status(200).json({ message: "Logged out" });
  console.log("captain logged out");
};
