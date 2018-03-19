// ToDo: Add more protocolls!
function searchForProtocolInLink(link) {
	if (link.search("http://") === -1 || link.search("https://") === -1) {
	}
}

$(function() {
	var socket = io();

	//Chat
	//sends the text to the server
	$("#chatform").submit(function() {
		socket.emit("chat message", $("#m").val());
		$("#m").val("");
		return false;
	});

	//adds the message on the webpage
	socket.on("chat message", function(msg, name) {
		let fullMessage = '<div class="nameBeforeMessage">' + name + "</div>";

		//ToDo: füge eine Box für den Namen neben die Nachricht hinzu. - Nur eine Box mit Name und dann Nachricht!
		if (msg.search("www.") === -1) {
			fullMessage += '<div class="textMsg">' + msg + "</div>";
		} else if (msg.search("http://") === -1) {
			fullMessage +=
				'<div class="textMsg">' +
				'<a href="http://' +
				msg +
				'">' +
				msg +
				"</a>" +
				"</div>";
		} else {
			fullMessage +=
				'<div class="textMsg">' +
				'<a href="' +
				msg +
				'">' +
				msg +
				"</a>" +
				"</div>";
		}

		//send the fullMessage
		$("#messages").prepend($('<div id="wrapperForText">').html(fullMessage));
	});

	//Chatnotification
	socket.on("chat message inform", function(msg) {
		var fullMessage = "<div class='textMsg'>" + msg + "</div>";
		$("#messages").prepend($("<div id=wrapperForText>").html(fullMessage));
	});

	//login
	// $("#loginButton").click(function() {
	$("#login").submit(function() {
		socket.emit("login Name", $("#loginInput").val());
		$("#loginInput").val("");
		$("#login").hide();
		$("#chat").show();
		return false;
	});
	// });
});
