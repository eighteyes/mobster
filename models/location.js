var mongoose = require('mongoose');

var locSchema = mongoose.Schema({
  lon: Number,
  lat: Number,
  time: Number,
  user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Location', locSchema);
