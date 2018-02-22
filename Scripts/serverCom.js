// ToDo: Add more protocolls!
function searchForProtocolInLink(link) {
	if (link.search("http://") === -1) {
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
		//ToDo: füge eine Box für den Namen neben die Nachricht hinzu.
		if (msg.search("www.") === -1) {
			$("#messages").prepend(
				$("<div 'class=wrapperForText'>").html(
					'<div class="nameBeforeMessage">' +
						name +
						"</div>" +
						'<div class="textMsg">' +
						msg +
						"</div>"
				)

				// $("<div class='nameBeforeMessage'>").text(name),
				// $("<div class='textMsg'>").text(msg)
			);
			// $("#messages").prepend($("<div class='nameBeforeMessage'>").text(name));
		} else if (msg.search("http://") === -1) {
			$("#messages").append(
				$("<li>").html('<a href="http://' + msg + '">' + msg + "</a>")
			);
		} else {
			$("#messages").append(
				$("<li>").html('<a href="' + msg + '">' + msg + "</a>")
			);
		}
	});

	//Chatnotification
	socket.on("chat message inform", function(msg) {
		$("#messages").prepend($("<div class='textMsg'>").text(msg));
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
