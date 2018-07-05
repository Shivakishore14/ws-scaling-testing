const WebSocket = require('ws');

const port = process.env.SERVER_PORT || 8585;
const wss = new WebSocket.Server({ port: port });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send("echo node :"+message);
  });
});