'use strict';

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');
const Stopwatch = require('../../../modules/Stopwatch/index.js');
const testStopwatch = new Stopwatch();

const mockFn = jest.fn();
const bid = 1;
const user = 'user';

describe('Testing the Stopwatch methods', () => {
  test('Can successfully start the counter', () => {
    testStopwatch.start(mockFn);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
    expect(testStopwatch.status).toBeTruthy();
    expect(typeof testStopwatch.countTime).toBe('object');
    expect(testStopwatch.status).toBeTruthy();
  });
  test('Can successfully add time to the counter', () => {
    expect(testStopwatch.seconds).toEqual(null);
    testStopwatch.addTime(bid, user);
    expect(testStopwatch.seconds).toEqual(5);
    expect(typeof testStopwatch.seconds).toBe('number');
  });
  test('Can successfully decrease time to the counter', () => {
    testStopwatch.decreaseTime();
    expect(testStopwatch.seconds).toEqual(4);
  });
  test('Can successfully stop the counter', () => {
    expect(testStopwatch.status).toEqual(true);
    testStopwatch.stop();
    expect(testStopwatch.status).toEqual(false);
  });
});
