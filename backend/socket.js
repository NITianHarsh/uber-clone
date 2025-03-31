import { Server } from "socket.io";
import userModel from "./models/user.js";
import captainModel from "./models/captain.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Consider restricting this in production
      methods: ["GET", "POST"],
    },
  });

  // Socket.IO Connection
  io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;

      if (!userId || !userType) {
        console.log("Invalid join data received", data);
        return;
      }

      try {
        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketID: socket.id });
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketID: socket.id });
        } else {
          console.log("Invalid user type:", userType);
        }
      } catch (error) {
        console.error("Error updating socket ID:", error);
      }
    });

    socket.on("update-captain-location", async (data) => {
      const { userId, location } = data;
      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid Location Data" });
      }
      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export const sendMessageToSocketId = (socketId, messageObject) => {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.error("Socket.io not initialized");
  }
};
