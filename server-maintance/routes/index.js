const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/.well-known/acme-challenge/Im9tHPL_O7AEsK8VOvpsp3PAtgMWiELIS0Irvvvh6nY', function(req, res, next) {
    res.sendFile('Im9tHPL_O7AEsK8VOvpsp3PAtgMWiELIS0Irvvvh6nY', {root: path.join(__dirname, '../')});
});

router.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../../front-maintance/dist/')});
});

module.exports = router;