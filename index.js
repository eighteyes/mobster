var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mobster');

var User = require('./models/user');
var Location = require('./models/location');

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(1337);


function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  console.log('connection made');
  var updatePayload = doUpdate();
  socket.emit('update', { hi: 'yair'});

  socket.on('init', function(data){
    console.log('INIT DATA', data);
    User.findOne({ userId: data.userId }).populate('location')
    .exec( function (err, user) {
      console.log(user);
      socket.emit('init', user);
    });
  });
  socket.on('test', function (data) {
    console.log('test', data);
    socket.emit('test', {location: {
        lat: 35,
        lon: -45,
        time: new Date()
    }});
  });
});

function doUpdate(){

}