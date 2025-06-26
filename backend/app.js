const userRoutes = require("./routes/user.routes");
const mapsRoutes = require("./routes/maps.routes");
const rideRoutes = require("./routes/ride.routes");
const captainRoutes = require("./routes/captain.routes");

const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const connectToDb = require("./Db/db");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
connectToDb();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/maps", mapsRoutes);
app.use("/rides", rideRoutes);
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);

module.exports = app;
