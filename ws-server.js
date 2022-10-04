// server.js
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8080 })
wss.on('connection', ws => {
  setInterval(function () {
    ws.send("WEBSOCKET MESSAGE");
  }, 1000*10);
})