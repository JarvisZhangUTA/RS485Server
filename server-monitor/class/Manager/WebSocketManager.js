const CommandManager = require('./CommandManager');
const CommandModel = require('../../models/Command.model');

module.exports = class WebSocketManager {

  constructor(websocket) {
    this.devices = {};
    this.users = {};

    this.websocket = websocket;
    this.websocket.on('connection', this.onConnect);

    this.commandManager = new CommandManager();
  }

  onConnect(ws, req) {
    let that = this;

    ws.on('message', (message) => {
      message = that.parseMessage(message);
      if( !message ) {
        return;
      }
      if( message.type !== 'verify' ) {
        return;
      }

      switch( message.data ) {
        case 'user':
          that.users[message.id] = ws;
          ws.on('message', (message) => { 
            message = that.parseMessage(message);
            if(message) {
              that.onUserMessage(ws, message);
            }
          });
          break;
        case 'device':
          that.devices[message.id] = ws;
          ws.on('message', (message) => { 
            message = that.parseMessage(message);
            if(message) {
              that.onDeviceMessage(ws, message);
            }
          });
          break;
      }
    });

    ws.on('close', () => {

      Object.keys( that.users ).forEach(key => {
        if( that.users[key] == ws ) {
          delete that.users[key];
        }
      });

      Object.keys( that.devices ).forEach(key => {
        if( that.devices[key] == ws ) {
          delete that.devices[key];
        }
      });

    });
  }

  parseMessage( message ) {
    try {
      message = JSON.parse(message);
      return message;
    } catch ( e ) {
      console.error(e);
    }
    return null;
  }


  /**
   * User Send
   * { type: 'verify', data: 'user', id: '' }
   * { type: 'message', device_id: '', data: ''}
   * { type: 'users' }
   * { type: 'devices' }
   * 
   * User Receive
   * { type: 'users', data: [] }
   * { type: 'devices', data: [] }
   * { type: 'message', device_id: '', data: '' }
   * { type: 'ack', data: '' }
   * { type: 'error', data: '' }
   * { type: 'unverified' }
   * 
   * Device Send
   * { type: 'verify', data: 'device', id: '' }
   * { type: 'message', data: '' }
   * 
   * Device Receive
   * { type: 'message', data: '' }
   * { type: 'error', data: '' }
   * { type: 'unverified' }
   */

  onUserMessage(ws, message) {
    switch( message.type ) {
      case 'message':
          if( !message.device_id ) {
              this.sendMessage(ws, {
                  type: 'error', 
                  data: 'No device id to send'
              });
              return;
          }

          let device = devices[message.device_id];

          if( !device ) {
              this.sendMessage(ws, {
                  type: 'error', 
                  data: 'Device not found'
              });
              return;
          }
          
          this.sendMessage(device, {
              type: 'message', 
              data: message.data
          });
          
          this.sendMessage(ws, {
              type: 'ack', 
              data: 'Message sent to ' + message.device_id
          });
          break;
      case 'users':
          this.sendMessage(ws, {
              type: 'users', 
              data: Object.keys(this.users)
          });
          break;
      case 'devices':
          this.sendMessage(ws, {
              type: 'devices', 
              data: Object.keys(this.devices)
          }); 
          break;
    }
  }

  onDeviceMessage(ws, message) {
    switch( message.type ) {
      case 'message':
        let device_id = Object.keys(this.devices).find(key => this.devices[key] === ws);
        let commands = this.commandManager.splitCommand( message.data );

        commands.forEach(command => {
          command.device_id = device_id;
          command.date = new Date();
    
          this.sendMessage(Object.values(this.users), { type: 'message', data: command });
          new CommandModel(command).save();
        });

        this.sendMessage(Object.values(this.users), {
            type: 'message',
            data: commands
        });
        break;
    }
  }

  sendMessage(to, message) {
    if( Array.isArray(to) ) {
      to.forEach(item => {
          item.send(JSON.stringify( message ));
      })
    } else {
      to.send(JSON.stringify( message ));
    }
  }
}