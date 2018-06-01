
var express = require('express'); 
var portno = 3000;   // Port number to use
var app = express(); 

app.use(express.static(__dirname));

const DEFAULT_NUM = 12; 
var cards = [];

var server = app.listen(portno, function () {
	var port = server.address().port;
	console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});

