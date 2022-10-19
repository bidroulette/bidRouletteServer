// Libraries here

const Stopwatch = require('./modules/stopwatch/Stopwatch/index.js');
const stpwtch = new Stopwatch();
// Globals here

let userBidAmount = 10;
let ususerNameOrId = 'User';

// Functions here 

stpwtch.start();
setTimeout(() => stpwtch.addTime(userBidAmount, ususerNameOrId), 5000)