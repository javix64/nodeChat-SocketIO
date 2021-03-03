//init socket
const io = require( "socket.io" )();
const socketapi = {
    io: io
};

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg) {
    console.log('chat message', msg);
    io.emit('chat message', msg);
  });
});

// end of socket.io logic

module.exports = socketapi;