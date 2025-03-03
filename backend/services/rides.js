import rideModel from "../models/ride.js";
import { getDistanceAndTime } from "./maps.js";
import crypto from "crypto";
async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }

  const { distance, time } = await getDistanceAndTime(pickup, destination);

  const baseFare = {
    car: 50,
    auto: 30,
    motorcycle: 20,
  };
  const rates = {
    car: 10, // per km
    auto: 7, // per km
    motorcycle: 5, // per km
  };

  return {
    carFare: baseFare.car + (distance.value / 1000) * rates.car,
    autoFare: baseFare.auto + (distance.value / 1000) * rates.auto,
    motorCycleFare:
      baseFare.motorcycle + (distance.value / 1000) * rates.motorcycle,
  };
}

function getOtp(num) {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();
  return otp;
}

const createRide = async ({ userId, pickup, destination, vehicleType }) => {
  if (!userId || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = await rideModel.create({
    userId,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
  });

  return ride;
};

export default createRide;
