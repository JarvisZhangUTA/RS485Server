const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/.well-known/acme-challenge/:a_string', function(req, res, next) {
    res.sendFile( req.params.a_string, {root: path.join(__dirname, '../')});
});

router.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../../front-maintance/dist/')});
});

module.exports = router;