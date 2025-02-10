import userModel from "../models/user.js";
import jwt from "jsonwebtoken";

// to see user is authenticate or not
export const authUser = async (req, res, next) => {

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];  // token is usually in header or cookie
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await userModel.findOne({ token: token });
  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // decoded me utna he data milega jitna toekn create krte time diya tha ( see the gen.Token func() userModel)
    const user = await userModel.findById(decoded._id);

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};