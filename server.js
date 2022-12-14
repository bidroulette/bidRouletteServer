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
let currentHighestBid = {
  currentHighestBid: 0,
  userId: ''
};
const stopwatch1 = new Stopwatch();

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
    console.log('Params.Payload', typeof params.Payload);
    lambda.invoke(params, function (err, data) {
      if (err) console.log('Failure!', err, err.stack); // an error occurred
      else console.log('Success!', data);           // successful response
    });

    console.log(currentHighestBid)
    stopwatch1.seconds = payload.auctionTime;



    // start of auction - emit item for auction
    socket.broadcast.emit('itemReady', (payload))
    stopwatch1.start(() => {

      // end of auction information
      let endAuctionItem = {
        auctionWinnerId: currentHighestBid.currentHighestBidder,
        highestBid: currentHighestBid.currentHighestBid,
        auctionId: payload.auctionId,
        itemId: payload.itemId,
      }

      //end of auction 
      messages.emit('endAuction', endAuctionItem)

      var params = {
        FunctionName: 'postWinningBid', /* required */
        InvocationType: 'Event',
        Payload: JSON.stringify(endAuctionItem),
      };
      console.log('WinningBid Params.Payload', typeof params.Payload);
      lambda.invoke(params, function (err, data) {
        if (err) console.log('Failure!', err, err.stack); // an error occurred
        else console.log('Success!', data);           // successful response
      });

      currentHighestBid = 0;
      messages.in(payload.itemId).socketsJoin('lobby');
      messages.socketsLeave(payload.itemId);
    });
  })

  //accepting the bids from clients
  socket.on('bid', (payload) => {

    //checks to see if auction has time and bid is higher than current bid
    if (stopwatch1.status && payload.userBid > currentHighestBid.currentHighestBid) {

      //adds 5 secs if a bid is accepted
      stopwatch1.addTime(payload.userBid, payload.userId);
      currentHighestBid = {
        currentHighestBid: payload.userBid,
        currentHighestBidder: payload.userId
      };
      socket.broadcast.emit('bid', currentHighestBid)

    } else if (!stopwatch1.status) {
      console.log('auction over')
    } else if (payload.userBid < currentHighestBid) {
      console.log('There is a higher bid')
    }
  })

  //when a room is created all clients are joined to that room, and when auction ends clients are pushed back to lobby
  socket.on('joinRoom', (payload) => {
    socket.leave('lobby')
    socket.join(payload.itemId)
    console.log('client joined ', payload.itemId, socket.rooms)
  })
})
