import { validationResult } from "express-validator";
import {
  createRide,
  getFare,
  rideConfirm,
  rideEnd,
  rideStart,
} from "../services/rides.js";
import {
  getAddressCoordinates,
  getCaptainsInTheRadius,
} from "../services/maps.js";
import { sendMessageToSocketId } from "../socket.js";
import rideModel from "../models/ride.js";

export const makeRide = async (req, res) => {
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
    
    const pickupCoordinates = await getAddressCoordinates(pickup);
      
    const captainsInRadius = await getCaptainsInTheRadius(
      pickupCoordinates.ltd,
      pickupCoordinates.lng,
      2
    );
    
    
    // got all the captains, now hide the otp of the ride made and send that info on captain's socket id
    ride.otp = "";

    const rideWithUser = await rideModel
      .findOne({ _id: ride._id })
      .populate("user", "-password"); // Ensure the user is fully populated, excluding sensitive fields like password

    captainsInRadius.forEach((captain) => {
      sendMessageToSocketId(captain.socketID, {
      event: "new-ride",
      data: rideWithUser,
      });
    });
    res.status(201).json({ message: "Ride created successfully", ride });
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

export const confirmRide = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    const ride = await rideConfirm({ rideId, captain: req.captain });
    sendMessageToSocketId(ride.user.socketID, {
      event: "ride-confirmed",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
};

export const startRide = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;
    const ride = await rideStart({ rideId, otp, captain: req.captain });

    sendMessageToSocketId(ride.user.socketID, {
      event: "ride-started",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
};

export const endRide = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    const ride = await rideEnd({ rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketID, {
      event: "ride-ended",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
};
