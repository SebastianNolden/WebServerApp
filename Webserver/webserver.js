const express = require("express");
const app = express();
const file = require("fs");

const path = require("path");

const server = require("http").createServer(app);
const io = require("socket.io").listen(server);

users = [];

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

function searchUsersForIdReturnId(id) {
	let userPosition = -1;

	for (var i = 0; i < users.length; i++) {
		if (users[i].id === id) {
			userPosition = i;
		}
	}
	return userPosition;
}

// files for Front End
app.use(express.static(path.join(mainDirName, "Style")));
app.use(express.static(path.join(mainDirName, "Scripts")));

app.get("/", function(req, res) {
	res.sendFile(mainDirName + "index.html");
});

//ToDo: Chat auf Socket Basis - socket.io! Gerne auch mit jQuery und Bootstrap
//https://www.youtube.com/watch?v=tHbCkikFfDE
// scheint die Schnittstelle zum Senden von Nachrichten und so zu sein!
io.sockets.on("connection", function(socket) {
	let inChat = false;
	//console.log("Someone entered the Site");

	//Disconnect
	socket.on("disconnect", function() {
		if (!inChat) {
			//console.log(`Someone left the Site`);
		} else {
			var usersID = users.findIndex(x => x.id === socket.id);
			var name = users[usersID]["name"];
			users.splice(usersID, 1);
			io.emit("chat message inform", `${name} left the Chat.`);
		}
	});

	socket.on("chat message", function(msg) {
		var name = users[searchUsersForIdReturnId(socket.id)]["name"];
		io.emit("chat message", msg, name);
	});

	socket.on("login Name", function(name) {
		users.push({ id: socket.id, name: name });
		io.emit("chat message inform", `${name} entered the Chat.`);
		console.log(`${name} entered the Chatsystem.`);
		inChat = true;
		// console.log(users);
	});
});

// man kann wohl auch mehrmals das gleiche Event abfangen und bearbeiten
// io.sockets.on("connection", function(socket) {
// 	socket.on("chat message", function(msg) {
// 		console.log("message: " + msg);
// 		io.emit("chat message", msg);
// 	});
// });
