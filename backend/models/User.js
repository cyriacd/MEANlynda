var User = require('../models/User');
var mongoose = require('mongoose');
module.exports = mongoose.model('User', {
  name: String,
  email: String,
  password_hash: String
});
