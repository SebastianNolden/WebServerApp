var express = require("express");
var app = express();

var path = require("path");

var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

//My port for localhost
const PORT = 3000;
server.listen(process.env.PORT || PORT);

console.log(`Server is running on Port ${PORT}`);

function dirChangeForMainFolder() {
	let string = __dirname;
	let pos = string.lastIndexOf("\\");
	return string.substring(0, pos + 1);
}
var mainDirName = dirChangeForMainFolder();

app.use(express.static(path.join(mainDirName, "Style")));
app.use(express.static(path.join(mainDirName, "Scripts")));

app.get("/", function(req, res) {
	res.sendFile(mainDirName + "index.html");
});

//ToDo: Chat auf Socket Basis - socket.io! Gerne auch mit jQuery und Bootstrap
//https://www.youtube.com/watch?v=tHbCkikFfDE
// scheint die Schnittstelle zum Senden von Nachrichten und so zu sein!
io.sockets.on("connection", function(socket) {
	console.log("A User connected to the Chat.");

	//Disconnect
	socket.on("disconnect", function() {
		console.log("A User disconnected.");
	});

	socket.on("chat message", function(msg) {
		//console.log("message: " + msg);
		io.emit("chat message", msg);
	});

	// man kann wohl auch mehrmals das gleiche Event abfangen und bearbeiten
	// io.sockets.on("connection", function(socket) {
	// 	socket.on("chat message", function(msg) {
	// 		console.log("message: " + msg);
	// 		io.emit("chat message", msg);
	// 	});
});
