import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

connectToDb().catch((err) => console.log(err));

async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB not connected  --> ", error);
  }
}

export default connectToDb;
