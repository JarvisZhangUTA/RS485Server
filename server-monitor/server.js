/** HTTP */
const express = require('express');
const path = require('path');
const app = express();
const http = require('http');

app.use(express.static(path.join(__dirname,'../front-monitor/dist/')));
app.use(function (req, res, next) {
    res.sendFile('index.html', {root: path.join(__dirname, '../front-monitor/dist/')});
});

const httpServer = http.createServer(app);
httpServer.listen(3000, () => { 
    console.log('HTTP Server listening on port 3000') 
});


/** WEB SOCKET */
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const devices = {};
const users = {};

const mysql = require('mysql');

wss.on('connection', function connection(ws, req) {
    const ip = req.connection.remoteAddress;
    let verified = false;
    
    ws.on('message', function incoming(message) {
        console.log('receive message ' + message);
        try{
            message = JSON.parse(message);

            if( message.type !== 'verify' && !verified ) {
                console.log('unverified message ' + message);
                return;
            }

            if( message.type === 'verify' ) {
                verified = message.data;
                if( verified === 'user' ) {
                    users[ip] = ws;
                } else if( verified === 'device' ) {
                    devices[ip] = ws;
                }
                return;
            }
            
            if( verified === 'device' ) {
                receive_from_device(message);
            } else if( verified === 'user' ) {
                receive_from_user(message);
            }
            
        } catch ( e ) {
            console.log('parse error');
            console.log(message);
            ws.send(JSON.stringify({
                type: 'error',
                data: 'parse error ' + message
            }));
        }
    });

    ws.on('close', function close() {
        if( verified === 'device' ) {
            delete devices[ip];
        }

        if( verified === 'user' ) {
            delete users[ip];
        }
    });

    /**
     * User Send
     * { type: 'verify', data: 'user' }
     * { type: 'message', addr: '', data: ''}
     * { type: 'users' }
     * { type: 'devices' }
     * 
     * User Receive
     * { type: 'users', data: [] }
     * { type: 'devices', data: [] }
     * { type: 'message', addr: '', data: '' }
     * { type: 'ack', data: '' }
     * { type: 'error', data: '' }
     * { type: 'unverified' }
     * 
     * Device Send
     * { type: 'verify', data: 'device' }
     * { type: 'message', data: '' }
     * 
     * Device Receive
     * { type: 'message', data: '' }
     * { type: 'error', data: '' }
     * { type: 'unverified' }
     */

    function receive_from_device(message) {
        console.log('receive from device');
        switch( message.type ) {
            case 'message':
                send_message(Object.values(users), {
                    type: 'message',
                    addr: ip,
                    data: message.data
                });

                const connection = mysql.createConnection({
                    host: 'localhost',
                    user: 'admin',
                    password : 'qgk112358',
                    database : 'monitor'
                });
                connection.connect();
                connection.query(`INSERT INTO temp (addr, number, date) VALUES ('` + ip + `','` + message.data + `','` + new Date().toISOString().slice(0, 19).replace('T', ' ') + `')`);
                connection.end();
                break;
        }
    }

    function receive_from_user(message) {
        console.log('receive from user');
        switch( message.type ) {
            case 'message':
                if( !message.addr ) {
                    send_message(ws, {
                        type: 'error', data: 'No device addr to send'
                    });
                    return;
                }

                let device = devices[message.addr];

                if( !device ) {
                    send_message(ws, {
                        type: 'error', data: 'Device not found'
                    });
                    return;
                }
                
                send_message(device, {
                    type: 'message', data: message.data
                });
                
                send_message(ws, {
                    type: 'ack', data: 'Message sent to ' + message.addr
                });
                break;
            case 'users':
                send_message(ws, {
                    type: 'users', data: Object.keys(users)
                });
                break;
            case 'devices':
                send_message(ws, {
                    type: 'devices', data: Object.keys(devices)
                }); 
                break;
        }
    }

    function send_message(to, message) {
        if( Array.isArray(to) ) {
            to.forEach(item => {
                item.send(JSON.stringify( message ));
            })
        } else {
            to.send(JSON.stringify( message ));
        }
    }
});