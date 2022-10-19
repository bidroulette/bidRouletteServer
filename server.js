'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const io = require('socket.io');
const PORT = process.env.PORT || 3002;

const Stopwatch = require('./modules/Stopwatch/index.js');


app.use(cors());
app.get('/', (req, res, next) => {res.send('This route works.')})

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
      console.log(payload);
      
        socket.broadcast.emit('itemReady', (payload))
        socket.emit('endAuction', {
          userId: 'Cognito id',
          itemId: chance.guid(),
          item:'test item',
          itemDescription: 'Test item description',
          startTime: startTime,
          auctionTime: auctionTime,
          intialBid: 'dollar amount',
      })
    })
})
