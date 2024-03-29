var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/mobster');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

var User = require('./models/user');
var Location = require('./models/location');
var users = [];
var locations = [];



for (var i = 0; i <= 25; i++) {
  var location = new Location( randLoc() );
  location.save();

  var user = new User( randUser(i, location) );
  user.save();
};


function randUser(id, loc) {
  var user = {};
  var name = userId = "";

  for (var i = 0; i < 8; i++) {
    name += Math.ceil(Math.random() * 36).toString(36);
  }

  for (var i = 0; i < 1; i++) {
    // userId += Math.ceil(Math.random() * 10).toString(10);
    userId = id;
  }

  user.location = loc._id;
  user.userName = name;
  user.userId = userId;
  return user;
}

function randLoc() {
  //25.794709, -80.206637
  var lat = 25.794 + (Math.random()/100) - 0.005;
  var lon = -80.206 + (Math.random()/100) - 0.005;
  var time = new Date().getTime() + Math.round(Math.random() * 1000);
  return {
    lat: lat,
    lon: lon,
    time: time
  };
}
});
