'use strict';

jest.useFakeTimers();
jest.spyOn(global, 'setInterval');
const Stopwatch = require('./../../../modules/Stopwatch/index.js');
const testStopwatch = new Stopwatch();

const mockFn = jest.fn();
const bid = 1;
const user = 'user';

describe('Testing the Stopwatch methods', () => {
    test('Can successfully start the counter', () => {
        expect(testStopwatch.seconds).toEqual(10);
        testStopwatch.addTime(bid, user);
        expect(testStopwatch.seconds).toEqual(15);
        expect(typeof testStopwatch.seconds).toBe('number');
    });
    test('Can successfully start the counter', () => {
        testStopwatch.start(mockFn);
        expect(setInterval).toHaveBeenCalledTimes(1);
        expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
        expect(testStopwatch.status).toBeTruthy();
        console.log(testStopwatch.this.countTime)

        expect(typeof testStopwatch.countTime).toBe('string');
        console.log(testStopwatch.countTime)
        expect(testStopwatch.status).toBeTruthy();
    });
});