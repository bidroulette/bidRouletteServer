'use strict'

const io = require('socket.io-client');
const Chance = require('chance');
const chance = new Chance();

const socket = io.connect("Bidroulette-env.eba-8jup62nc.us-west-2.elasticbeanstalk.com")

const startTime = new Date();
const auctionTime = 300000;

socket.emit('itemForAuction', {
    userId: 'Cognito id',
    itemId: chance.guid(),
    item:'test item',
    itemDescription: 'Test item description',
    startTime: startTime,
    auctionTime: auctionTime,
    intialBid: 'dollar amount',
})
