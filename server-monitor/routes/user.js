const config = require('../config');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const UserModel = require('../models/User.model');
const InvitationCodeModel = require('../models/InvitationCode.model');

const StrHelper = require('../class/Helper/StrHelper');

router.get('/invitations', async function(req, res) {
  const token = req.headers.token;
  if( !token ) {
    return res.status(400).send('Authorization fail.');
  }

  const decoded = jwt.verify(token, config.jwt_secret);
  if( !decoded ) {
    return res.status(400).send('Authorization fail.');
  }

  let invitations = await InvitationCodeModel.find({generate_user: decoded.id}).exec();
  res.status(200).json(invitations);
});

router.post('/invitations', async function(req, res) {
  const token = req.headers.token;
  if( !token ) {
    return res.status(400).send('Authorization fail.');
  }

  const decoded = jwt.verify(token, config.jwt_secret);
  if( !decoded ) {
    return res.status(400).send('Authorization fail.');
  }

  const invitation_data = {
    code: StrHelper.makeId(8),
    generate_user: decoded.id,
    active_user: '',
    permission: {
      can_send_request: false,
      can_upgrade: false
    }
  };

  if (req.query && req.query.can_send_request === 'true') {
    invitation_data.permission.can_send_request = true;
  }

  if (req.query && req.query.can_upgrade === 'true') {
    invitation_data.permission.can_upgrade = true;
  }

  const invitation = new InvitationCodeModel(invitation_data);

  invitation.save();
  
  res.status(200).json(invitation);
});

router.post('/register', jsonParser, async function(req, res) {
  if( !req.body.email ) { return res.status(404).send('Email needed'); }
  if( !req.body.password ) { return res.status(404).send('Password needed'); }
  if( !req.body.invitation_code ) { return res.status(404).send('Invitation Code needed'); }

  const invitation = await InvitationCodeModel.findOne({code: req.body.invitation_code, active_user: ''}).exec();
  if( !invitation ) { return res.status(404).send('Invalid invitation Code'); }

  const exist_user = await UserModel.findOne({email: req.body.email}).exec();
  if( exist_user ) { return res.status(404).send('Exist User Email'); }

  const user = new UserModel({ email: req.body.email, password: req.body.password, role: 'user' });
  user.save();

  invitation.active_user = user._id;
  invitation.save();

  let userData = { id: user._id, email: user.email, role: user.role };
  userData.token = jwt.sign(userData, config.jwt_secret)

  res.status(200).json(userData);
});

router.post('/login', jsonParser , async function(req, res) {
  if( !req.body.email ) { return res.status(404).send('Email needed'); }
  if( !req.body.password ) { return res.status(404).send('Password needed'); }
  let user = await UserModel.findOne({email: req.body.email, password: req.body.password}).exec();
  if( !user ) { return res.status(404).send('User not found'); }
  let userData = { id: user._id, email: user.email, role: user.role };
  userData.token = jwt.sign(userData, config.jwt_secret)
  res.status(200).json(userData);
});

module.exports = router;