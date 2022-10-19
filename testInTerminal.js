// // Libraries here

const Stopwatch = require('./modules/Stopwatch/index.js');
const stpwtch = new Stopwatch();
// const stpwtch2 = new Stopwatch();
// const stpwtch3 = new Stopwatch();
// // Globals here

let userBidAmount = 10;
let ususerNameOrId = 'User';

// // Functions here 

stpwtch.start();
// stpwtch2.start();
// stpwtch3.start();
setTimeout(() => stpwtch.addTime(userBidAmount, ususerNameOrId), 1000)
// setTimeout(() => stpwtch2.addTime(userBidAmount, ususerNameOrId), 3000)
// setTimeout(() => stpwtch3.addTime(userBidAmount, ususerNameOrId), 5000)
