import express from "express";
import { authUser } from "../middlewares/auth.js";
import {
  autoSuggestions,
  getCoordinates,
  getDisAndTim,
} from "../controller/maps.js";
import { query } from "express-validator";

const mapsRouter = express.Router();

mapsRouter.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getCoordinates
);

mapsRouter.get(
  "/get-distance-time",
  [
    query("address1").isString().isLength({ min: 3 }),
    query("address2").isString().isLength({ min: 3 }),
  ],
  authUser,
  getDisAndTim
);

mapsRouter.get(
  "/get-suggestion",
  query("input").isString().isLength({ min: 3 }),
  authUser,
  autoSuggestions
);

export default mapsRouter;
