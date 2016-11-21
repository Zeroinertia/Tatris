var rows = 20;
var columns = 10;
var size = 32;

var canvas;
var ctx;
var blockImg;
var backgroundImg;
var gameOverImg;

var ourPiece;
var gameData;
var imgLoader;
var previousTime;
var currentTime;
var isGameOver;
var lineSpan;

var currentLines;
var score = 0;
var highscore = 0;


window.onload = onReady;

function onReady() {
	imgLoader = new BulkImageLoader();
	imgLoader.addImage("blocks.png","blocks");
	imgLoader.addImage("bg.png","bg");
	imgLoader.addImage("over.png","over");
	imgLoader.onReadyCallback = onImagesLoaded;
	imgLoader.loadImages();
	
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");
	lineSpan = document.getElementById("lines");
	fetchHiScore();
	
	previousTime = currentTime = 0;
	
	document.onkeydown = getInput;
}

function getInput(e) {
	if(!e) { var e = window.event; }
	
	e.preventDefault();
	
	if(isGameOver != true) {
		switch(e.keyCode) {
			
			case 37: 
			if(checkMove(ourPiece.gridX - 1, ourPiece.gridY, ourPiece.curState)) {
				ourPiece.gridX--;
			}
			break;
			
			case 39:
			if(checkMove(ourPiece.gridX + 1, ourPiece.gridY, ourPiece.curState)) {
				ourPiece.gridX++;
			}
			break;
			
			case 38:
			{
			var newState = ourPiece.curState - 1;
			
			if(newState < 0) 
				newState = ourPiece.states.length - 1;
			
			
			if(checkMove(ourPiece.gridX, ourPiece.gridY, newState)) 
				ourPiece.curState = newState;
			}
			break;
			
			case 40:
			if(checkMove(ourPiece.gridX, ourPiece.gridY + 1, ourPiece.curState)) {
				ourPiece.gridY++;
			}
			break;
		}
	}
	else {
		updateHiScore(score);
		var newGame = prompt("You got " + currentLines + " lines. \nYour score was: " + score + "\nStart new game? (y/n)");
		if(newGame === "y") {
			initGame();
		} 
	}
}

function fetchHiScore() {
	if(window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onload = function() {
		highscore = this.responseText;
	};
	
	xmlhttp.open("GET","tatris_fetchHighScore.php",true);
	xmlhttp.send();
	

function updateHiScore(newScore) {
	if(window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.open("GET","tatris_updatescore.php?s="+newScore,true);
	xmlhttp.send();
}

function onImagesLoaded(e) {
	blockImg = imgLoader.getImageAtIndex(0);
	backgroundImg = imgLoader.getImageAtIndex(1);
	gameOverImg = imgLoader.getImageAtIndex(2);
	
	initGame();
}

function initGame() {
	var r, c;
	currentLines = 0;
	score = 0;
	isGameOver = false;
	
	if(gameData == undefined) {
		gameData = new Array();
		
		for(r = 0; r < rows; r++) {
			gameData[r] = new Array();
			
			for(c = 0; c < columns; c++) {
				gameData[r].push(0);
			}
		}
	} else {
		for(r = 0; r < rows; r++) {
			for(c = 0; c < columns; c++) {
				gameData[r][c] = 0;
			}
		}
	}
	
	ourPiece = getRandomPiece();
	
	lineSpan.innerHTML = currentLines.toString();
	document.getElementById("points").innerHTML = score.toString();
	document.getElementById("highscore").innerHTML = highscore.toString();
	
	var requestAFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || 
								window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
	window.requestAnimationFrame = requestAFrame;
	
	requestAnimationFrame(update);
}

function update() {
	currentTime = new Date().getTime();
	
	var speed = 500 - ((Math.floor(currentLines / 50) * 0.1) * 500);
	
	if(currentTime - previousTime > speed) {
		// update the game piece
		if(checkMove(ourPiece.gridX, ourPiece.gridY + 1, ourPiece.curState)) {
			ourPiece.gridY++;
		} else {
			copyData(ourPiece);
			ourPiece = getRandomPiece();
		}
		
		// update time
		previousTime = currentTime;
	}
	
	ctx.clearRect(0, 0, 320, 640);
	drawBoard();
	drawPiece(ourPiece);
	
	if(isGameOver == false) {
		requestAnimationFrame(update);
	} else {
		ctx.drawImage(gameOverImg, 0, 0, 320, 640, 0, 0, 320, 640);
	}
}

function copyData(piece) {
	var xPos = piece.gridX;
	var yPos = piece.gridY;
	var state = piece.curState;
	
	for(var r = 0, len = piece.states[state].length; r < len; r++) {
		for(var c = 0, len2 = piece.states[state][r].length; c < len2; c++) {
			if(piece.states[state][r][c] == 1 && yPos >= 0) {
				gameData[yPos][xPos] = (piece.color + 1);
			}
			xPos++;
		}
		xPos = piece.gridX;
		yPos++;
	}
	checkLines();
	
	if(piece.gridY < 0) {
		isGameOver = true;
	}
}

function checkLines() {
	var concurrentLines = 1;
	var lineFound = false;
	var fullRow = true;
	var r = rows - 1;
	var c = columns - 1;
	
	while(r >= 0) {
		while(c >= 0) {
			if(gameData[r][c] == 0) {
				fullRow = false;
				c = -1;
			}
			c--;
		}
		if(fullRow == true) {
			zeroRow(r);
			score += (100 * concurrentLines);
			r++;
			lineFound = true;
			currentLines++;
			concurrentLines++;
		}
		
		fullRow = true;
		c = columns - 1;
		r--;
	}
	if(lineFound) {
		lineSpan.innerHTML = currentLines.toString();
		document.getElementById("points").innerHTML = score.toString();
	}
}

function zeroRow(row) {
	var r = row;
	var c = 0;
	
	while(r >= 0) {
		while(c < columns) {
			if(r > 0) {
				gameData[r][c] = gameData[r - 1][c];
			} else {
				gameData[r][c] = 0;
			}
			c++;
		}
		c = 0;
		r--;
	}
}

function drawBoard() {
	ctx.drawImage(backgroundImg, 0, 0, 320, 640, 0, 0, 320, 640);
	
	for(var r = 0; r < rows; r++) {
		for(var c = 0; c < columns; c++) {
			if(gameData[r][c] != 0) {
				ctx.drawImage(blockImg, (gameData[r][c] - 1) * size, 0, size, size, c * size, r * size, size, size);
			}
		}
	}
}

function drawPiece(piece) {
	var drawX = piece.gridX;
	var drawY = piece.gridY;
	var state = piece.curState;
	
	for(var r = 0, len = piece.states[state].length; r < len; r++) {
		for(var c = 0, len2 = piece.states[state][r].length; c < len2; c++) {
			if(piece.states[state][r][c] == 1 && drawY >= 0) {
				ctx.drawImage(blockImg, piece.color * size, 0, size, size, drawX * size, drawY * size, size, size);
			}
			drawX++;
		}
		drawX = piece.gridX;
		drawY++;
	}
}

function checkMove(xPos, yPos, newState) {
	var result = true;
	var newX = xPos;
	var newY = yPos;
	
	for(var r = 0, len = ourPiece.states[newState].length; r < len; r++) {
		for(var c = 0, len2 = ourPiece.states[newState][r].length; c < len2; c++) {
			if(newX < 0 || newX >= columns) {
				result = false;
				c = len2;
				r = len;
			}
			
			if(gameData[newY] != undefined && gameData[newY][newX] != 0 
				&& ourPiece.states[newState][r] != undefined && ourPiece.states[newState][r][c] != 0) {
				result = false;
				c = len2;
				r = len;
			}
			
			newX++;
		}
		newX = xPos;
		newY++;
		
		if(newY > rows) {
			r = len;
			result = false;
		}
	}
	return result;
}
