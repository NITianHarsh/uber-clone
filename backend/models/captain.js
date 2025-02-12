import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      minLength: [3, "First name must be at least 3 characters"],
      trim: true,
    },
    lastname: {
      type: String,
      default: "",
      trim: true,
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    minLength: [5, "Email must be at least 5 characters"],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false, // taki ye feild user ke pass na jaye
  },
  socketID: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minLength: [3, "Color must be at least 3 characters"],
      trim: true,
    },
    plate: {
      type: String,
      required: true,
      minLength: [3, "Plate no. must be at least 3 characters"],
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capcity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },
  location: {
    lat: {
      type: Number,
    },
    long: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Creating captain Model
const captainModel = mongoose.model("captain", captainSchema);
export default captainModel;
