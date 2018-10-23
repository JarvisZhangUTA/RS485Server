const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/.well-known/acme-challenge/cA_YtIdgEblc7Di3MBfmji4cbS9e1ePJtz4If1tHpuo', function(req, res, next) {
    res.sendFile('cA_YtIdgEblc7Di3MBfmji4cbS9e1ePJtz4If1tHpuo', {root: path.join(__dirname, '../')});
});

router.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../../front-maintance/dist/')});
});

module.exports = router;