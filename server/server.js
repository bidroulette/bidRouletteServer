'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const io = require('socket.io');
const PORT = process.env.PORT || 3002;
const { stopwatch, createTime } = require('../modules/stopwatch/stopwatch.js')

app.use(cors());

const server = http.createServer(app);
const socketServer = io(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  }
})

server.listen(PORT);

const messages = socketServer.of('messages');

messages.on('connection', (socket) => {
  console.log('Client Connected', socket.id);

    socket.on('itemForAuction', (payload) => {
        console.log(payload)
        stopwatch(createTime(payload))
        socket.broadcast.emit('itemReady', (payload))
    })
})
