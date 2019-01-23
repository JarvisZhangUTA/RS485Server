
const mongoose = require('mongoose');
const DeviceSchema = mongoose.Schema({
    device_id: String,
    mac: String,
    secret: String,
    verified: Boolean,
    last_updated: Date
},{ 
    strict: true 
});
const DeviceModel = mongoose.model('DeviceModel', DeviceSchema);
module.exports = DeviceModel;