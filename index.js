var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mobster');

var User = require('./models/user');
var Location = require('./models/location');

var express = require('express');
var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(1337);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.use(express.static(__dirname));


io.sockets.on('connection', function(socket) {
  console.log('connection made');

  // Init > Client - Send all users
  User.find().populate('location').exec(function(err, users) {
    socket.emit('init', users);
  });

  // Client > Init
  socket.on('init', function(data) {
    console.log('INIT DATA', data);
    updateUserLoc(data);
  });

  socket.on('update', function(data) {
    console.log('UPDATE DATA', data);
    updateUserLoc(data);
    socket.broadcast.emit('update', data);
  });

  socket.on('chat', function(data) {
    User.findOne({
      userId: data.userId
    }, 'userName', function(err, user) {
      socket.broadcast.emit('chat', {
        msg: user.userName + " : " + data.msg
      });
      socket.emit('chat', {
        msg: user.userName + " : " + data.msg
      });
    });
  });


function updateUserLoc(data) {
  var newUser = false;
  User.findOne({
    userId: data.userId
  }, function(err, user) {
    if ( user === null ){
      user = new User({ userId: data.userId, userName: data.userName || "testUser" });
      newUser = true;
    }
    var loc = new Location({
      user: user,
      lat: data.lat,
      lon: data.lon,
      time: new Date().getTime()
    });
    loc.save(function(err, loc) {
      if (err) console.log(err);
      user.location = { lat: loc.lat, lon: loc.lon, time: loc.time };
      user.save( function(err, user) {
        if (newUser) socket.broadcast.emit('newUser', user);
      });
    });
  });
}
});
