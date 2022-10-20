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
const Chance = require('chance');
const chance = new Chance();

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
  socket.join('lobby')

  socket.on('join', (payload) => {
    socket.join(payload.itemId);
    console.log('client joining', payload.itemId)
  });

    socket.on('itemForAuction', (payload) => {
      socket.join(payload.itemId)
      console.log(payload);
      console.log(currentHighestBid)
      stopwatch1.seconds = payload.auctionTime;
       socket.broadcast.emit('itemReady', (payload))
       stopwatch1.start(() => {
        messages.emit('endAuction', {
          auctionWinnerId: currentHighestBidder,
          highestBid: currentHighestBid.currentHighestBid,
          auctionId: payload.auctionId,
          itemId: payload.itemId,
        })
        currentHighestBid = 0;
        messages.in(payload.itemId).socketsJoin('lobby');
        messages.socketsLeave(payload.itemId);
      });
    })
    socket.on('bid', (payload) => {
      if(stopwatch1.status && payload.userBid > currentHighestBid){
        stopwatch1.addTime(payload.userBid, payload.userId);
        currentHighestBid = {
          currentHighestBid: payload.userBid,
          currentHighestBidder: payload.userId};

      } else if (!stopwatch1.status){
        console.log('auction over')
      } else if (payload.userBid < currentHighestBid){
        console.log('There is a higher bid')
      }
    })
    socket.on('joinRoom', (payload) => {
      socket.leave('lobby')
      socket.join(payload.itemId)
      console.log('client joined ', payload.itemId, socket.rooms)
    })
})