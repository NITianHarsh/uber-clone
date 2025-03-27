import blacklistModel from "../models/blacklist.js";
import captainModel from "../models/captain.js";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";

// to see user is authenticate or not
export const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // token is usually in header or cookie
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blacklistModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // we use jwt.verify to verify the user token ..it takes 2 things, 1. the token 2. the JWT secert which was used to create the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // decoded me utna he data milega jitna token create krte time diya tha ( see the gen.Token func() userModel)
    const user = await userModel.findById(decoded._id);

    req.user = user;
    console.log("User authenticated", user);
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await blacklistModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);

    req.captain = captain;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
