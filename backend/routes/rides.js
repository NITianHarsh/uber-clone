import express from "express";
import { body } from "express-validator";
import { makeRide } from "../controller/rides";
import { authUser } from "../middlewares/auth";

const ridesRouter = express.Router();

ridesRouter.post(
  "/create",
  authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body
    .apply("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body
    .apply("vehicleType")
    .isString()
    .isIn(["auto", "car", "motorcycle"])
    .withMessage("Invalid vehicle type"),
  makeRide
);

export default ridesRouter;
