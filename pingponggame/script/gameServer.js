//	CONNECT TO PORT 8080
var io = require('socket.io').listen(8080);
//	INITIAL PLAYER COUNT IS SET TO 0
var count = 0;
speedX = speedY = dirX = dirY = 0;
io.sockets.on('connection', function (socket) {
	//	AFTER CONNECTION PLAYER COUNT INCREASES BY 1
		count += 1;
		if(count == 1) {
			socket.emit('id', { playerid: 1 });
		}
		else if(count >= 2) {
			socket.emit('id', { playerid: 2 });
			//	SENDS MESSAGE TO START THE GAME
			io.sockets.emit('gameStart', { start: true, speedX: speedX, speedY: speedY, dirX: dirX, dirY: dirY});
		}
		else {
			socket.emit('id', { playerid: 0 });
		}
		//	RECEIVES AND SENDS MESSAGE WHEN KEY IS PRESSED
		socket.on('movePlayer', function(data) {
			io.sockets.emit('movePlayer', { player: data['player'], pos: data['pos']});
		});
		socket.on('moveBall', function(data) {
			speedX = data['speedX'];
			speedY = data['speedY'];
			dirX = data['dirX'];
			dirY = data['dirY'];
			io.sockets.emit('moveBall', { speedX: speedX, speedY: speedY, dirX: dirX, dirY: dirY });
		});
		socket.on('disconnect', function(socket) {
			count -= 1;
		});
	});