const fs = require('fs');
const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const fileUpload = require('express-fileupload');

const path = require('path');
const restRouter = require('./routes/rest');
const indexRouter = require('./routes/index');


const privateKey = fs.readFileSync('privkey.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');
const ca = fs.readFileSync('chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

app.use(fileUpload());

app.use(express.static(path.join(__dirname,'../front-maintance/dist/')));

app.use('/', indexRouter);
app.use('/api', restRouter);

app.use(function (req, res, next) {
    res.sendFile('index.html', {root: path.join(__dirname, '../front-maintance/dist/')});
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// httpServer.listen(80, () => { 
//     console.log('HTTP Server listening on port 80') 
// });

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});

// httpServer.listen(3000, () => { 
// 		console.log('HTTP Server listening on port 3000') 
// });