// Install the uuid library first
// npm install uuid

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });

  socket.on('chat_message', (msg) => {
      io.emit('chat_message', msg);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
