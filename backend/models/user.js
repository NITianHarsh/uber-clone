import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
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
    select: false, // Prevents this field from being returned in queries
  },
  socketID: {
    type: String,
    default: null,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
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

/* 
.methods (Instance Methods) → Used on individual document instances.
      Example: generateAuthToken(), comparePassword().
      Accesses "this", referring to the specific document.

.statics (Static Methods) → Used on the model itself.
      Example: hashPassword().
      Doesn't require an instance; operates on the entire model.

*/
