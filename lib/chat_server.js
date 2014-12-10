var socketio = require('socket.io'),
	_ = require('lodash');

var handleMessages = function (socket, io) {
	socket.on('message', function (data) {
		console.log("message: " + data.text);
		
		socket.emit('message', {
			text: data.text
		});
	})
}

var createChat = function (server) {
	var io = socketio.listen(server);
	
	io.on('connection', function (socket) {
		handleMessages(socket, io);
	})
}

module.exports = createChat;