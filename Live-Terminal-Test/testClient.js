'use strict'

const io = require('socket.io-client');

const socket = io.connect("http://localhost:3002/messages")

let intialBid = 5;
let intervalId = null;

socket.on('itemReady', (payload) => {
    socket.emit('joinRoom', {
        itemId: payload.itemId,
    })
    makeBid()
    console.log(payload)
})

let makeBid = () => {
    intervalId = setInterval(() => {
        if (intialBid >= 45) { stopBid() }
        else {
            intialBid += 10
            console.log(`Placing bid of ${intialBid}`)
            socket.emit('bid', { userBid: intialBid, userId: 'Client 1' })
        }
    }, 10000);
}

socket.on('endAuction', (payload) => {
    console.log(payload);
})

socket.on('bid', (payload) => {
    console.log(payload);
})

socket.emit('bid', (payload) => {
    console.log(payload);
})

function stopBid() {
    clearInterval(intervalId);
    console.log('Personal max bid limit hit, stopping bids');
}
