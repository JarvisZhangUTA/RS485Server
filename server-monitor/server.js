/** DATABASE */

/** HTTP */
const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const config = require('./config');

app.use(express.static(path.join(__dirname,'../front-monitor/dist/')));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/monitor');

const userRouter = require('./routes/user');
app.use('/api/users', userRouter);

const commandRouter = require('./routes/command');
app.use('/api/commands', commandRouter);

app.use(function (req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, '../front-monitor/dist')});
});

const httpServer = http.createServer(app);
httpServer.listen(3000, () => { console.log('HTTP Server listening on port 3000') });


/** WEB SOCKET */
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const WebSocketManager = require('./class/Manager/WebSocketManager');
const webSocketManager = new WebSocketManager(wss);

const UserModel = require('./models/User.model');
UserModel.findOne({email: config.default_user}, function(err, user){
  if( !user ) {
    user = new UserModel({ email: config.default_user, password: config.defult_password, role: 'admin' })
    user.save();
  }
});