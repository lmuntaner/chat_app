
(function (root) {
	var App = root.App = (root.App || {});
	
	var ChatUI = App.ChatUI = function (chat) {
		this.chat = chat;
		this.$messages = $('#messages');
		this.$newMessage = $('new-message');
		this.messageTemplate = _.template($('#message-tmpl').html());
	};
	
	ChatUI.prototype.registerHandlers = function () {
		var chatUi = this;
		
		this.chat.socket.on('message', function (message) {
			var msg = chatUi.messageTemplate(message);
			chatUi.$messages.append(msg);
		});
		
		$('#send-form').on('submit', function (event) {
			event.preventDefault();
			chatUi.processInput();
		});
	};
	
	ChatUI.prototype.processInput = function () {
		var text = this.$newMessage.val();
		this.chat.sendMessage(text);
		this.$newMessage.val('');
	}
})(this);