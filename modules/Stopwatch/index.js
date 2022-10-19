'use strict';

class Stopwatch {
   constructor(stopwatchName) {
      this.status = false;
      this.seconds = 10; // For testing purposes this is set to 10. Set this to 30 and delete this comment when site goes live!
      this.intervalId = undefined;
   }

   decreaseTime() {
      this.seconds--
      console.log(`Time remaining: ${this.seconds}   Auction Status: ${this.status}`);
      if(this.seconds === 0) {
         this.stop();
      }
   }

   addTime(bid, user) {
      this.seconds += 5;
      console.log(`A bid of $${bid}.00 was placed by ${user}, adding ${5} seconds to the timer`);
      console.log(`Time remaining: ${this.seconds}   Auction Status: ${this.status}`);
   }

   start(payload) {
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