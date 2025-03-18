import { validationResult } from "express-validator";
import { createRide, getFare } from "../services/rides.js";

export const makeRide = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    const ride = await createRide({
      userId: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    return res.status(201).json({ message: "Ride created successfully", ride });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getsFare = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination } = req.query;
    const fare = await getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
};
