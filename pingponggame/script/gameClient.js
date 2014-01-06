function connectToServer() {
	socket = io.connect('http://localhost:8080');
	socket.on('id', function(data) {
		playerid = data['playerid'];
		if(playerid == 1) {
			document.getElementById('playernum').innerHTML = "You are player " + playerid;
			socket.emit('moveBall', { speedX: ball.speedX, speedY: ball.speedY, dirX: dirX, dirY: dirY });		
		}
		else if(playerid == 2) {
			document.getElementById('playernum').innerHTML = "You are player " + playerid;
		}
		else if(playerid == 0) {
			document.getElementById('playernum').innerHTML = "Sorry! Already 2 players in the game.";
		}
	});
	//	ONCE THE GAME STARTS, THE BALL SPEED AND DIRECTIONS ARE SET SAME FOR BOTH THE OPPONENTS
	socket.on('gameStart', function(data) {
		if(data['start'] == true) {
			gameCheck = 1;
			ball.speedX = data['speedX'];
			ball.speedY = data['speedY'];
			dirX = data['dirX'];
			dirY = data['dirY'];
		}
	});
	//	RECEIVES MESSAGE FROM SERVER FROM KEY IS PRESSED
	socket.on('movePlayer', function(data) {
		if(data['player'] == 'player1') {
			if(data['pos'] == 'negY') {
				player1.posY -= speed;
			}
			else if(data['pos'] == 'posY') {
				player1.posY += speed;
			}
		}
		else if(data['player'] == 'player2') {
			if(data['pos'] == 'negY') {
				player2.posY -= speed;
			}
			else if(data['pos'] == 'posY') {
				player2.posY += speed;
			}
		}
	});
	socket.on('moveBall', function(data) {
		dirX = data['dirX'];
		dirY = data['dirY'];
		ball.speedX = data['speedX'];
		ball.speedY = data['speedY'];
	});
}