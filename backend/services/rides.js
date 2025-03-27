import crypto from "crypto";
import rideModel from "../models/ride.js";
import { getDistanceAndTime } from "../services/maps.js";

export async function getFare(pickup, destination) {
  const distanceData = await getDistanceAndTime(pickup, destination);

  if (!distanceData || !distanceData.distance) {
    throw new Error("Failed to get distance information");
  }

  // Convert "12 km" to a numeric value (e.g., 12)
  const distanceInKm = parseFloat(distanceData.distance.replace(" km", ""));

  if (isNaN(distanceInKm)) {
    throw new Error("Invalid distance format from API");
  }

  const baseFare = {
    car: 50,
    auto: 30,
    motorcycle: 20,
  };
  const rates = {
    car: 10, // per km
    auto: 8, // per km
    motorcycle: 5, // per km
  };

  return {
    car: baseFare.car + distanceInKm * rates.car,
    auto: baseFare.auto + distanceInKm * rates.auto,
    motorcycle: baseFare.motorcycle + distanceInKm * rates.motorcycle,
  };
}

function getOtp(num) {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();
  return otp;
}

export const createRide = async ({
  userId,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!userId || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = await rideModel.create({
    userId,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType], // Corrected fare assignment
  });

  return ride;
};

export const rideConfirm = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captain,
    }
  );
  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");
  if (!ride) {
    throw new Error("Ride not found");
  }
  return ride;
};

export const rideStart = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp) {
    throw new Error("Ride id and OTP is required");
  }
  const ride = await rideModel
    .findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride Not Found");
  }
  if (ride.status !== "accepted") {
    throw new Error("Ride Not accepted");
  }
  if (ride.otp !== otp) {
    throw new Error("Invalid OTP");
  }
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );
  return ride;
};

export const rideEnd = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }
  const ride = await rideModel
    .findOne({ _id: rideId, captain: captain._id })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }
  if (ride.status !== "ongoing") {
    throw new Error("Ride is Not ongoing");
  }
  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );
  return ride;
};
