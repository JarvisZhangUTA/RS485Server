const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/monitor');

const UserModel = require('../models/User.model');

UserModel.findOne({ email: 'zhangjw.uta@gmail.com' }, function (err, user) {
  if( user ) return;
  new UserModel({ email: 'zhangjw.uta@gmail.com', password: 'qgk112358', role: 'admin' }).save();
});