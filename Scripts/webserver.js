var express = require("express");
var app = express();

//ToDo: Find a way to load a html file
app.get("/", function(req, res) {
	res.send("\\..\\index.html");
});

app.listen(3000, function() {
	console.log("Webserver listening on port 3000!");
});
