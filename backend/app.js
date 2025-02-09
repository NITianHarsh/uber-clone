import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();

app.use(cors()); // for now, sari websites se accept krenge, later only a specific domain
app.get("/", (req, res) => {
  res.send("Hey Its working !");
});

export default app;
