'use strict';

require('../../server.js');

let socket = {
  emit: jest.fn(),
  on: jest.fn(),
  join: jest.fn(),
  leave: jest.fn()
};

const payload = {
  test: 'test',
};

describe('testing the sockets', () => {
  test('Joinroom socket test', () => {
    socket.on('joinRoom', (payload));
    expect(socket.on).toBeTruthy();
    expect(socket.emit).toBeTruthy();
    expect(payload).toEqual({ "test": "test" });
    expect(socket.on).toHaveBeenCalledWith("joinRoom", {"test": "test"});
  });
});
