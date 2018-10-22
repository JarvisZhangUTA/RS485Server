const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (req, res, next) {
  
  let token = req.headers.token;

  if( !token ) {
    res.status(502).send('No Authorization');
    return;
  }

  const decoded = jwt.verify(token, config.jwt_secret);

  if( !decoded ) {
    res.status(502).send('Authorization Fail');
    return;
  }

  next()
}