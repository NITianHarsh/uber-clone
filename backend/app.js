import "dotenv/config";
import cors from "cors";
import express from "express";
import connectToDb from "./Db/db.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import captainRouter from "./routes/captain.js";

const app = express();

connectToDb();


app.use(cors()); // for now, sari websites se accept krenge, later only a specific domain
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/users", userRouter);
app.use("/captains", captainRouter);


app.get("/", (req, res) => {
  res.send("Hey Its working !");
});
export default app;
