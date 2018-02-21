function searchForProtocolInLink(link) {
	if (link.search("http://") === -1) {
	}
}

$(function() {
	var socket = io();
	$("form").submit(function() {
		socket.emit("chat message", $("#m").val());
		$("#m").val("");
		return false;
	});
	socket.on("chat message", function(msg) {
		if (msg.search("www.") === -1) {
			$("#messages").append($("<li>").text(msg));
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
});
