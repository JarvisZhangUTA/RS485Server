const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const fs = require('fs');

const devices = [];
const users = [];

wss.on('connection', function connection(ws) {
    let verified = false;
    
    ws.on('message', function incoming(message) {
        try{
            message = JSON.parse(message);

            if( message.type !== 'verify' && !verified ) {
                console.log('unverified message ' + message);
                return;
            }

            if( message.type === 'verify' ) {
                verified = message.data;
                if( verified === 'user' ) {
                    users.push(ws);
                } else if( verified === 'device' ) {
                    devices.push(ws);
                }
                return;
            }
            
            if( verified === 'user' ) {
                receive_from_device(message);
            } else if( verified === 'device' ) {
                receive_from_user(message);
            }
            
        } catch ( e ) {
            console.log('parse error');
            console.log(message);
        }
    });

    ws.on('close', function close() {
        if( verified === 'device' ) {
            let index = devices.indexOf(ws);
            if( index !== -1 ) {
                devices.splice(index, 1);
            }
        }

        if( verified === 'user' ) {
            let index = users.indexOf(ws);
            if( index !== -1 ) {
                users.splice(index, 1);
            }
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
     * { type: 'message_ack', data: '' }
     * { type: 'message', addr: '', data: '' }
     * 
     * Device Send
     * { type: 'verify', data: 'device' }
     * { type: 'message', data: '' }
     * 
     * Device Receive
     * { type: 'message', data: '' }
     */

    function receive_from_device(message) {
        switch( message.type ) {
            case 'message':
                users.forEach(user => {
                    user.send();
                });
                break;
        }
    }

    function receive_from_user() {

    }

    function send_message(to, message) {
        to.send(JSON.stringify( message ));
    }
});