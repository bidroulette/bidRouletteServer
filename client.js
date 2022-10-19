'use strict'

const io = require('socket.io-client');
const Chance = require('chance');
const chance = new Chance();

const socket = io.connect("http://localhost:3002/messages")

const startTime = new Date();
const endTime = new Date(startTime.getTime() + 300000)

socket.on('itemReady', (payload) => {
    console.log(payload)
})
socket.on('endAuction', (payload) => {
    console.log(payload);
})

let intialBid = 5;

setInterval(() => {
    intialBid += 5;
        socket.emit('bid', {
            userBid: intialBid,
            userId: 'test'
        })
    }, 9000)