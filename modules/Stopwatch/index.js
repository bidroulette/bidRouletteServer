'use strict';

class Stopwatch {
   constructor() {
      this.status = false;
      this.seconds = null; // For testing purposes this is set to 10. Set this to 30 and delete this comment when site goes live!
      this.intervalId = undefined;
      this.onEnd = null;
   }

   decreaseTime() {
      this.seconds--
      console.log(`Time remaining: ${this.seconds}   Auction Status: ${this.status}`);
      if(this.seconds === 0) {
         this.stop();
         this.onEnd();
      }
   }

   addTime(bid, user) {
      this.seconds += 5;
      console.log(`A bid of $${bid}.00 was placed by ${user}, adding ${5} seconds to the timer`);
      console.log(`Time remaining: ${this.seconds}   Auction Status: ${this.status}`);
   }

   start(cb) {
      this.onEnd = cb;
      console.log(`Checking auction status before Status: ${this.status}`);
      this.status = true;
      this.countTime = setInterval(this.decreaseTime.bind(this), 1000);
      this.intervalId = this.countTime;
      console.log(`Time starting at: ${this.seconds}   Auction Status: ${this.status}`);
   }

   stop() {
      this.status = false;
      clearInterval(this.intervalId);
      console.log(`Time expired, auction closing   Auction status: ${this.status}`);
   }
}

module.exports = Stopwatch;
