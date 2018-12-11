
const mongoose = require('mongoose');
const CommandSchema = mongoose.Schema({
    device_id: String,
    date: Date,
    type: String,
    original_command: String
});
const CommandModel = mongoose.model('CommandModel', CommandSchema);
module.exports = CommandModel;