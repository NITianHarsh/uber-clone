import http from "http";
import app from "./app.js";
import { Server } from "socket.io";
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Change this to match your frontend origin
    methods: ["GET", "POST"],
  },
});


// Store io instance in app for use in routes if needed
app.set("io", io);

// Socket.IO Connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for a message event from the client
  socket.on("message", (data) => {
    console.log("Received message:", data);

    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server is listening and running on port ${port}`);
});
