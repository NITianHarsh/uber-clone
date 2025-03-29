import express from "express";
import { body, query } from "express-validator";
import { getsFare, makeRide } from "../controller/rides.js";
import { authUser } from "../middlewares/auth.js";
import { validationResult } from "express-validator";

const ridesRouter = express.Router();

ridesRouter.post(
  "/create",
  authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "motorcycle"])
    .withMessage("Invalid vehicle type"),
     // Add a middleware to check for validation errors:
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Send back the array of errors if any validation failed
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }, 
  makeRide
);

ridesRouter.get(
  "/get-fare",
  authUser,
  query("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  query("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  getsFare
);

export default ridesRouter;
