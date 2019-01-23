
const mongoose = require('mongoose');
const InvitationCodeSchema = mongoose.Schema({
  code: String,
  generate_user: String,
  active_user: String,
  permission: {
    can_send_request: Boolean,
    can_upgrade: Boolean
  }
});
const InvitationCodeModel = mongoose.model('InvitationCodeModel', InvitationCodeSchema);
module.exports = InvitationCodeModel;