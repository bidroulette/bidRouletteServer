'use strict'

const io = require('socket.io-client');
const Chance = require('chance');
const chance = new Chance();

const socket = io.connect("http://localhost:3002/messages")

const startTime = new Date();
const endTime = new Date(startTime.getTime() + 300000)

socket.on('itemReady', (payload) => {
    socket.emit('joinRoom', {
        itemId: payload.itemId,
    })
    console.log(payload)
})
socket.on('endAuction', (payload) => {
    console.log(payload);
})

let intialBid = 5;
let iterationNumber = 0;

let checkInterval = () => {
    if (iterationNumber > 1){
        clearInterval(interval)
    }
}

let interval = setInterval(() => {
    intialBid += 5;
    iterationNumber++;
        socket.emit('bid', {
            userBid: intialBid,
            userId: 'test'
        })
        checkInterval();
    }, 10000)