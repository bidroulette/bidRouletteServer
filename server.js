'use strict';

//bring in all of the dependencies

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const io = require('socket.io');
const PORT = process.env.PORT || 3002;

//port in the module that controls the timings
const Stopwatch = require('./modules/Stopwatch/index.js');
let currentHighestBid = 0;
const stopwatch1 = new Stopwatch();
const Chance = require('chance');
const chance = new Chance();

const AWS = require('aws-sdk');

app.use(cors());

// proof of life route for server
app.get('/', (req, res, next) => { res.send('This route works.') })

// integrate cors with localhost
const server = http.createServer(app);
const socketServer = io(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  }
})

// gives server access to AWS-SDK via developers access key
AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region,
  // endpoint: process.env.endpoint,
});

// pulls a new lambda object from aws-sdk to give server access to this function

const lambda = new AWS.Lambda();
console.log(lambda);
// lambda.addLayerVersionPermission(params, function (err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });


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

      //push new item to db via aws lambda
      var params = {
        FunctionName: 'postItem', /* required */
        InvocationType: 'Event', 
        Payload: JSON.stringify(payload),            
            };
          console.log('Params.Payload',typeof params.Payload);
          lambda.invoke(params, function(err, data) {
            if (err) console.log('Failure!', err, err.stack); // an error occurred
            else     console.log('Success!', data);           // successful response
          });

      console.log(currentHighestBid)
      stopwatch1.seconds = payload.auctionTime;
       socket.broadcast.emit('itemReady', (payload))
       stopwatch1.start(() => {
        messages.emit('endAuction', {
          auctionWinnerId: currentHighestBid.currentHighestBidder,
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