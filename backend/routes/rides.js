import express from "express";
import { body, query } from "express-validator";
import { getsFare, makeRide } from "../controller/rides.js";
import { authUser } from "../middlewares/auth.js";

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
  getsFare
);

export default ridesRouter;
