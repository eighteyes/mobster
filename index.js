var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

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
  socket.emit('news', { hello: 'world' });
  socket.on('test', function (data) {
    console.log('test', data);
    socket.emit('test', {location: {
        lat: 35,
        lon: -45,
        time: new Date()
    }});
  });
});