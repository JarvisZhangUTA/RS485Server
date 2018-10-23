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

const server = http.createServer(app);

server.listen(80, '0.0.0.0', function () { console.log('Server listening on port 3000!') });