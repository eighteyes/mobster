var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mobster');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("hi from mongo");

var userSchema = mongoose.Schema({
  name: String,
  userId: String,
  location: mongoose.Schema.Types.ObjectId
});

var locSchema = mongoose.Schema({
  lon: Number,
  lat: Number,
  time: Number
})
var User = mongoose.model('User', userSchema );

var Location = mongoose.model('Location', locSchema);

var users = [];
var locations = [];

var location = new Location( randLoc() );
var user = new User( randUser(location) );
console.log(location, user);


function randUser(loc) {
  var user = {};
  var name = userId = "";

  for (var i = 0; i < 8; i++) {
    name += Math.ceil(Math.random() * 36).toString(36);
  }

  for (var i = 0; i < 8; i++) {
    userId += Math.ceil(Math.random() * 10).toString(10);
  }

  user.location = loc._id;
  user.name = name;
  user.userId = userId;
  return user;
}

function randLoc() {
  var lat = 35 + Math.random() - 0.5;
  var lon = 45 + Math.random() - 0.5;
  var time = new Date().getTime() + Math.round(Math.random() * 1000);
  return {
    lat: lat,
    lon: lon,
    time: time
  };
}
});
