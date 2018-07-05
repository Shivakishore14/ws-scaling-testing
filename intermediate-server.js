const WebSocket = require('ws');
const express = require('express');
const http = require('http');

const port = process.env.INTER_SERVER_PORT || 8686;
const serverAddress = process.env.SERVER_ADDR || 'ws://localhost:8585';

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({server});

app.get('/ping', (req, res) => res.send('pong'));


wss.on('connection', function connection(ws) {
    let wsclient = new WebSocket(serverAddress);

    wsclient.on('open', function open() {});
    
    wsclient.on('message', function incoming(data) {
        ws.send(data);
    });
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        wsclient.send(message)
    });
});

server.listen(process.env.PORT || port, () => {
    console.log(`Intermediate Server started on port ${server.address().port} :)`);
});