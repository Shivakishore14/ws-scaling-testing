const WebSocket = require('ws');
const express = require('express');
const http = require('http');

const port = process.env.SERVER_PORT || 8585;


const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

app.get('/ping', (req, res) => res.send('pong'));

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send("echo node :"+message);
  });
});

server.listen(process.env.PORT || port, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});