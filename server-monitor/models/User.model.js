
const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    role: String
},{ 
    strict: false 
});
const UserModel = mongoose.model('UserModel', UserSchema);
module.exports = UserModel;