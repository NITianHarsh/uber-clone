import { validationResult } from "express-validator";
import { createRide, getFare } from "../services/rides.js";
import {
  getAddressCoordinates,
  getCaptainsInTheRadius,
} from "../services/maps.js";
import { sendMessageToSocketId } from "../socket.js";

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
      f,
    });
    res.status(201).json({ message: "Ride created successfully", ride });
    
    const pickupCoordinates = await getAddressCoordinates(pickup);
    const captainsInRadius = await getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    ); 
    // got all the captains, now hide the otp of the ride made and send that info on captain's socket id
    ride.otp = "";
    captainsInRadius.map(async (captain) => {
      console.log(captain,ride);
      sendMessageToSocketId(captain.socketID, {
        event: "new-ride",
        data: ride,
      });
    });
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
