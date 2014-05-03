var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  userName: String,
  userId: Number,
  location: [{type: mongoose.Schema.Types.ObjectId, ref: 'Location'}]
});

module.exports = mongoose.model('User', userSchema );