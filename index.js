const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // Setting origin to "*" is the "Master Key"—it allows all websites to connect.
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("join_group", (groupId) => {
    socket.join(groupId);
  });

  socket.on("send_message", (data) => {
    socket.to(data.groupId).emit("receive_message", data);
  });
});

const PORT = process.env.PORT || 10000; // Use Render's port or 10000
server.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
