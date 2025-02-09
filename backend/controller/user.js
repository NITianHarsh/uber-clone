import { validationResult } from "express-validator";
import userModel from "../models/user.js";
import createUser from "../services/user.js";

const registerUser = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

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
  } catch (error) {
    next(error); // Pass the error to Express error handler
  }
};

export default registerUser;
