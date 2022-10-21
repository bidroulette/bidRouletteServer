'use strict';

const io = require('socket.io-client');
const http = require('http');
const express = require('express');
const app = express();

const server = http.createServer(app);
const socketServer = io(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  }
})

const messages = {
  on: jest.fn()
}

let socket = {
  emit: jest.fn(),
  on: jest.fn(),
  join: jest.fn(),
  leave: jest.fn(),
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
  test('Messages test', () => {
    messages.on('connection', (socket) => {
    socket.join('lobby')});
    expect(socket.on).toBeTruthy();
    expect(socket.emit).toBeTruthy();
    expect(typeof socket).toBe('object');
  });
  test('Socket server test', () => {
    expect(typeof socketServer.io).toBe('object');
  });
});
