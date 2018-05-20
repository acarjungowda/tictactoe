// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing to tic tac toe html page
app.get('/tictac', function(request, response) {
	response.sendFile(path.join(__dirname, 'tictac.html'));
});

// Starts the server
server.listen(5000, function() {
	console.log('Starting server on port 5000');
});


// handling the user input on the server
var players = {};
var playerOne;
var playerTwo;
var currentPlayer;
// Add the WebSocket handlers
io.on('connection', function(socket) {
	socket.on('new player', function() {
		console.log("handling new player event for the palyer" + socket.id);
		if (Object.keys(players).length === 0){
			players[socket.id] = {marker: "X"};
			playerOne = socket.id;
			currentPlayer = playerOne;
		} else if (Object.keys(players).length === 1) {
			players[socket.id] = {marker: 'O'};
			playerTwo = socket.id;
		}
	});


	socket.on('clickCell', function(x, y){
		console.log('receving data from clickCell and emiting state x='+x+" y="+y);
		if (currentPlayer === socket.id && Object.keys(players).length === 2) {
			var player = players[socket.id] || {};
			io.sockets.emit('boardState', x, y, player.marker);
			if (currentPlayer === playerOne) {
				currentPlayer = playerTwo;
			} else {
				currentPlayer = playerOne;
			}
		} else {
			console.log('wait for your opponent to make a move');
			io.to(socket.id).emit('waitForYourTurn')
		}
	});
});

setInterval(function() {
	io.sockets.emit('state', players);
}, 1000 / 60 );
