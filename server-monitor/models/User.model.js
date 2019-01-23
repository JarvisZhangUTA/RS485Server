
const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    role: String,
    permission: {
        can_send_request: Boolean,
        can_upgrade: Boolean
    },
    devices: [String]
},{ 
    strict: false 
});
const UserModel = mongoose.model('UserModel', UserSchema);
module.exports = UserModel;