(function (root) {
	var App = root.App = (root.App || {});
	
	var Chat = App.Chat = function (socket) {
		this.socket = socket;
		this.username = "anonimous";
	};
	
	Chat.prototype.sendMessage = function (text) {
		this.socket.emit("message", {
			text: text,
			username: this.username
		});
	};
	
	Chat.prototype.setUsername = function (username) {
		this.username = username;
	};
})(this);