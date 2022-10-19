'use strict'

const io = require('socket.io-client');
const Chance = require('chance');
const chance = new Chance();

const socket = io.connect("http://localhost:3002/messages")

const startTime = new Date();
const endTime = new Date(startTime.getTime() + 300000)

socket.emit('itemForAuction', {
    userId: 'Cognito id',
    itemId: chance.guid(),
    item:'test item',
    itemDescription: 'Test item description',
    startTime: startTime,
    endTime: endTime,
    intialBid: 'dollar amount',
})
