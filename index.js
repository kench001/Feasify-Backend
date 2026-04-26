const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // Replace the second URL with your actual Vercel URL once you have it
    origin: ["http://localhost:5173", "https://kench001-feasify.vercel.app"],
    methods: ["GET", "POST"],
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

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
