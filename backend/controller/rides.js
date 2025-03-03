import { validationResult } from "express-validator";
import createRide from "../services/rides.js";

export const makeRide = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicleType } = req.body;
    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    return res.status(201).json({ message: "Ride created successfully", ride });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
