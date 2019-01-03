
const mongoose = require('mongoose');
const InvitationCodeSchema = mongoose.Schema({
  code: String,
  generate_user: String,
  active_user: String
});
const InvitationCodeModel = mongoose.model('InvitationCodeModel', InvitationCodeSchema);
module.exports = InvitationCodeModel;