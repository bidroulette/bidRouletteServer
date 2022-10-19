'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const io = require('socket.io');
const PORT = process.env.PORT || 3002;
const Stopwatch = require('./modules/Stopwatch/index.js');
let currentHighestBid = 0;

const stopwatch1 = new Stopwatch();

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
  const onEnd = () => {
    socket.broadcast.emit('endAuction', {highestBid: currentHighestBid})
  }

    socket.on('itemForAuction', (payload) => {
      console.log(payload);
      stopwatch1.seconds = payload.auctionTime;
       socket.broadcast.emit('itemReady', (payload))
       stopwatch1.start(() => {
        messages.emit('endAuction', {highestBid: currentHighestBid})
      });
        
    })
    socket.on('bid', (payload) => {
      if(stopwatch1.status && payload.userBid > currentHighestBid){
        stopwatch1.addTime(payload.userBid, payload.userId);
        currentHighestBid = payload.userBid;
        console.log(currentHighestBid)
      } else if (!stopwatch1.status){
        console.log('auction over')
      } else if (payload.userBid < currentHighestBid){
        console.log('There is a higher bid')
      }
    })
})
