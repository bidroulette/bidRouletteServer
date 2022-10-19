'use strict';

class AuctionQueue {

  constructor(queueName) {
    this.auctionList = [];   
    this.queueName = queueName; 
  }

  addItem(listing) {
    this.auctionList.push(listing);
  }

  removeItem(){
    return this.auctionList.shift();
  } 
}

module.exports = AuctionQueue;