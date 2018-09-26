const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const fs = require('fs');

wss.on('connection', function connection(ws) {
    console.log('connection');
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        // ws.send(message);
        fs.appendFile('message.txt', message);
    });
});