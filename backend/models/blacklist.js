import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // 24hr expires
  },
});
const blacklist = mongoose.model("blacklist", blacklistSchema);
export default blacklist;
