var _ = require('lodash');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mobster');

var User = require('./models/user');
var Location = require('./models/location');

var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs')

  app.listen(1337);


function handler(req, res) {
  fs.readFile(__dirname + '/index.html',
    function(err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200);
      res.end(data);
    });
}

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
});

function updateUserLoc(data) {
  User.findOne({
    userId: data.userId
  }, function(err, user) {
    if ( user === null ){
      user = new User({ userId: data.userId, userName: data.userName || "testUser" });
    }
    var loc = new Location({
      user: user,
      lat: data.lat,
      lon: data.lon,
      time: new Date().getTime()
    });
    loc.save(function(err, loc) {
      if (err) console.log(err);
      user.location = loc;
      user.save();
    });
  });
}