const WebSocket = require('ws');

const port = process.env.INTER_SERVER_PORT || 8686;
const serverAddress = process.env.SERVER_ADDR || 'ws://localhost:8585';

const wss = new WebSocket.Server({ port: port });

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