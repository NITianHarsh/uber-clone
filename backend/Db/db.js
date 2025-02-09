import mongoose from "mongoose";

connectToDb().catch(err => console.log(err));

async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB not connected  --> ", error);
  }
}

export default connectToDb;