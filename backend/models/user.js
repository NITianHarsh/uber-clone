import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: [true, "First name is required"],
        minLength: [3, "First name must be at least 3 characters"],
        trim: true,
      },
      lastname: {
        type: String,
        minLength: [3, "Last name must be at least 3 characters"],
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
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};


// Creating User Model

const userModel = mongoose.model("user", userSchema);
export default userModel;
