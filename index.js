var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mobster');

var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(1337);

var User = mongoose.model('User', { name: String, userId: String, locations: [] });
var Location = mongoose.model('Location', { loc: Number, lat: Number, time: Number });

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
  socket.emit('update', updatePayload);

  socket.on('init', function(data){
    socket.emit('init', { hello: 'world'});
  })
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