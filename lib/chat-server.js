var socketio = require('socket.io');
var io;
var nicknames = {};
// list of socket ids
var clients = [];
var namesUsed = [];

exports.listen = function(server){
  io = socketio.listen(server);
  io.set('log level', 2);
  io.sockets.on('connection', function(socket){
    initializeConnection(socket);
    handleChoosingNicknames(socket);
    handleClientDisconnections(socket);
    handleMessageBroadcasting(socket);
  });
}

function initializeConnection(socket){
  //showActiveUsers(socket);
  showOldMsgs(socket);
}

function showActiveUsers(socket){
  var activeNames = [];
  var usersInRoom = io.sockets.clients();
  for (var index in usersInRoom){
    var userSocketId = usersInRoom[index].id;
    if (userSocketId !== socket.id && nicknames[userSocketId]){
      var name = nicknames[userSocketId];
      activeNames.push({id: namesUsed.indexOf(name), nick: name});
    }
  }
  socket.emit('names', activeNames);
}

function showOldMsgs(socket){
  //db.getOldMsgs(5, function(err, docs){
   // socket.emit('load old msgs', docs);
  //});
}

function handleChoosingNicknames(socket){
  socket.on('choose nickname', function(nick, cb) {
    if (namesUsed.indexOf(nick) !== -1) {
      cb('This username is already taken!  Please choose another.');
      return;
    }
    var ind = namesUsed.push(nick) - 1;
    clients[ind] = socket;
    nicknames[socket.id] = nick;
    cb(null);
    io.sockets.emit('new user', {id: ind, nick: nick});
  });
}

function handleMessageBroadcasting(socket){
  socket.on('message', function(msg){
    var nick = nicknames[socket.id];
    
      io.sockets.emit('message', {nick: nick, msg: msg});
   
  });
}

function handleClientDisconnections(socket){
  socket.on('disconnect', function(){
    var ind = namesUsed.indexOf(nicknames[socket.id]);
    delete namesUsed[ind];
    delete clients[ind];
    delete nicknames[socket.id];
    io.sockets.emit('user disconnect', ind);
  });
}