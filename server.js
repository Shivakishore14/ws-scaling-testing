const WebSocket = require('ws');
const express = require('express');
const http = require('http');
var fs = require('fs');

const port = process.env.SERVER_PORT || 8585;


const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({server, path:"/ws"});

app.get('/ping', (req, res) => res.send('pong'));

wss.on('connection', function connection(ws) {
  var contents = fs.readFileSync('ip.txt', 'utf8');
  ws.send("connected to SERVER:"+contents)
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send("echo node :"+message);
  });
});

server.listen(process.env.PORT || port, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});