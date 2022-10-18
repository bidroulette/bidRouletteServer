'use strict';

function stopwatch(setTime) {
	let timeLeft = setTime;
  console.log(timeLeft);
	timeLeft--;
	if (timeLeft > 0) {
		setTimeout(() => stopwatch(timeLeft), 1000);
	}
};

module.exports = {
  stopwatch
};
