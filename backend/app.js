import "dotenv/config";
import express from "express";
import cors from "cors";
import connectToDb from "./Db/db.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
const app = express();

connectToDb();
app.use(cors()); // for now, sari websites se accept krenge, later only a specific domain
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRouter);
app.get("/", (req, res) => {
  res.send("Hey Its working !");
});

export default app;
