'use strict'

const io = require('socket.io-client');
const Chance = require('chance');
const chance = new Chance();

const socket = io.connect("http://localhost:3002/messages")

const startTime = new Date();
const auctionTime =  10;

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

let intialBid = 5;
let iterationNumber = 0

let checkInterval = () => {
    if (iterationNumber > 1){
        clearInterval(interval)
    }
}

let  interval = setInterval(() => {
    intialBid += 2;
    iterationNumber++;
        socket.emit('bid', {
            userBid: intialBid,
            userId: 'test'
        })
        socket.emit('leave-room', {})
        checkInterval();
    }, 10000)

    socket.on('endAuction', (payload) => {
        console.log(payload);
    })
