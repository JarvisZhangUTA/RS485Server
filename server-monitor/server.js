/** DATABASE */

/** HTTP */
const express = require('express');
const path = require('path');
const app = express();
const http = require('http');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/monitor');

const restRouter = require('./routes/rest');
const indexRouter = require('./routes/index');

app.use(express.static(path.join(__dirname,'../front-monitor/dist/')));

app.use('/api', restRouter);
app.use('/', indexRouter);

const httpServer = http.createServer(app);
httpServer.listen(3000, () => { console.log('HTTP Server listening on port 3000') });


/** WEB SOCKET */
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
const WebSocketManager = require('./class/Manager/WebSocketManager');
const webSocketManager = new WebSocketManager(wss);