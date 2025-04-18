import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectToDb from "./Db/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import captainRouter from "./routes/captain.js";
import mapsRouter from "./routes/maps.js";
import ridesRouter from "./routes/rides.js";
dotenv.config();
const app = express();

connectToDb();

app.use(cors()); // for now, sari websites se accept krenge, later only a specific domain
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRouter);
app.use("/captains", captainRouter);
app.use("/maps", mapsRouter);
app.use("/rides", ridesRouter);

app.get("/", (_, res) => {
  res.send("Hey Its working !");
});
export default app;
