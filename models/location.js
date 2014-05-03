var mongoose = require('mongoose');

var locSchema = mongoose.Schema({
  lon: Number,
  lat: Number,
  time: Number
});

module.exports = mongoose.model('Location', locSchema);
