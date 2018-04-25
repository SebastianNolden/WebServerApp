// ToDo: Add more protocolls!
function searchForProtocolInLink(link) {
	if (link.search("http://") === -1 || link.search("https://") === -1) {
	}
}

function SwitchLoginAndChat() {
	$("#login").hide();
	$("#chat").show();
}

// this will be called when the dom is ready
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
		if (
			msg.search("www.") === -1 &&
			msg.search("https://") === -1 &&
			msg.search("http://") === -1
		) {
			fullMessage += '<div class="textMsg">' + msg + "</div>";
		} else if (msg.search("http://") === -1 && msg.search("https://") === -1) {
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
	$("#Basti").click(function() {
		//console.log($(this).attr("id"));
		let name = $(this).attr("id");
		socket.emit("login Name", name);
		SwitchLoginAndChat();
		return false;
	});

	$("#Kerstin").click(function() {
		let name = $(this).attr("id");
		socket.emit("login Name", name);
		SwitchLoginAndChat();
		return false;
	});

	//submit is only used with an object type="submit"!
	$("Send").click(function() {
		var name = $("#loginInput").val();
		//console.log(name);
		socket.emit("login Name", name);
		SwitchLoginAndChat();
		$("#loginInput").val("");
		return false;
	});
});
