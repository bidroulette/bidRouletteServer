'use strict'

const io = require('socket.io-client');
const Chance = require('chance');
const chance = new Chance();

const socket = io.connect("http://localhost:3002/messages")

const startTime = new Date();
const auctionTime =  10;

socket.emit('itemForAuction', {
    userId: 'Cognito id',
    itemId: chance.guid(),
    item:'test item',
    itemDescription: 'Test item description',
    startTime: startTime,
    auctionTime: auctionTime,
    intialBid: 'dollar amount',
})

let intialBid = 5;

setInterval(() => {
    intialBid += 2;
        socket.emit('bid', {
            userBid: intialBid,
            userId: 'test'
        })
    }, 7000)

    socket.on('endAuction', (payload) => {
        console.log(payload);
    })