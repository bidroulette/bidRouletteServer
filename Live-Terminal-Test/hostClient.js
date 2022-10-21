'use strict'

const io = require('socket.io-client');
const Chance = require('chance');
const chance = new Chance();

const socket = io.connect("http://localhost:3002/messages")

const startTime = new Date();
const auctionTime =  20;

socket.emit('itemForAuction', {
    auctionId: chance.guid(),
    itemId: chance.guid(),
    item:'test item',
    itemDescription: 'Test item description',
    startTime: startTime,
    auctionTime: auctionTime,
    intialBid: 'dollar amount',
    userId: 'test'
})

socket.on('endAuction', (payload) => {
  console.log(payload);
})
