import express from "express";
import { body, query } from "express-validator";
import {
  confirmRide,
  endRide,
  getsFare,
  makeRide,
  startRide,
} from "../controller/rides.js";
import { authCaptain, authUser } from "../middlewares/auth.js";

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

ridesRouter.post(
  "/confirm",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  confirmRide
);

ridesRouter.get(
  "/start-ride",
  authCaptain,
  query("rideId").isMongoId().withMessage("Invalid ride id"),
  query("otp").isString().isLength({ min: 6 }).withMessage("Invalid OTP"),
  startRide
);

ridesRouter.post(
  "/end-ride",
  authCaptain,
  body("rideId").isMongoId().withMessage("Invalid ride id"),
  endRide
);
export default ridesRouter;
