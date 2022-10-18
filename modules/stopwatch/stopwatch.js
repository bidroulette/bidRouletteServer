'use strict';

function stopwatch(setTime) {
	let timeLeft = setTime;
  console.log(timeLeft);
	timeLeft--;
	if (timeLeft > 0) {
		setTimeout(() => stopwatch(timeLeft), 1000);
	}
};

function createTime(payload){
	let parsedStartDate = new Date(payload.startTime);
	let parsedEndDate = new Date(payload.endTime);
	let startTime = parsedStartDate.getTime();
	let endTime = parsedEndDate.getTime();
	let stopwatchMilliseconds = endTime - startTime;
	let stopwatchSeconds = stopwatchMilliseconds / 1000;
	return stopwatchSeconds
}
module.exports = {
  stopwatch,
  createTime
};
