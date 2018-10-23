const express = require('express');
const app = express();
const http = require('http');
const fileUpload = require('express-fileupload');

const path = require('path');
const restRouter = require('./routes/rest');
const indexRouter = require('./routes/index');

app.use(fileUpload());

app.use(express.static(path.join(__dirname,'../front-maintance/dist/')));

app.use('/', indexRouter);
app.use('/api', restRouter);

app.use(function (req, res, next) {
    res.sendFile('index.html', {root: path.join(__dirname, '../front-maintance/dist/')});
});

app.get('.well-known/acme-challenge/Im9tHPL_O7AEsK8VOvpsp3PAtgMWiELIS0Irvvvh6nY', function(req, res, next) {
    res.sendFile('acme', {root: path.join(__dirname)});
});

const server = http.createServer(app);

server.listen(80, '0.0.0.0', function () { console.log('Server listening on port 3000!') });