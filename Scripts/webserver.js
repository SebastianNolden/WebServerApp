var express = require("express");
var app = express();

var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

//My port for localhost
const PORT = 3000;

server.listen(process.env.PORT || PORT);

console.log(`Server is running on Port ${PORT}`);

function dirChangeForIndex(){
	let string = __dirname;
	let pos = string.lastIndexOf("\\");
	return string.substring(0,42);
}

app.get("/", function(req, res){
	str = dirChangeForIndex();
	res.sendFile(str + "index.html")
});

//ToDo: Chat auf Socket Basis - socket.io! Gerne auch mit jQuery und Bootstrap
//https://www.youtube.com/watch?v=tHbCkikFfDE
// scheint die Schnittstelle zum Senden von Nachrichten und so zu sein!
io.sockets.on("connection", function(socket){

});
