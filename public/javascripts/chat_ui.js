
(function (root) {
	var App = root.App = (root.App || {});
	
	var ChatUI = App.ChatUI = function (chat) {
		this.chat = chat;
		this.$messages = $('#messages');
		this.$newMessage = $('#new-message');
		this.$username = $('#username');
		this.messageTemplate = _.template($('#message-tmpl').html());
		
		this.registerHandlers();
	};
	
	ChatUI.prototype.registerHandlers = function () {
		var chatUi = this;
		
		this.chat.socket.on('message', function (data) {
			var msg = chatUi.messageTemplate(data);
			chatUi.$messages.append(msg);
		});
		
		$('#send-form').on('submit', function (event) {
			event.preventDefault();
			chatUi.processInput();
		});
	};
	
	ChatUI.prototype.processInput = function () {
		var text = this.$newMessage.val();
		var username = this.$username.val();
		if (username) {
			this.chat.setUsername(username);
		}
		this.chat.sendMessage(text);
		this.$newMessage.val('');
	}
})(this);