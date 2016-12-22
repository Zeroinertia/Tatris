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
var highscore = fetchHiScore();


window.onload = onReady;


// Image loader to pre-load all the images before the game starts so blocks don't start moving before they're visible.
function onReady() {
	imgLoader = new BulkImageLoader();
	imgLoader.addImage("../img/blocks.png","blocks");
	imgLoader.addImage("../img/bg.png","bg");
	imgLoader.addImage("../img/over.png","over");
	imgLoader.onReadyCallback = onImagesLoaded;
	imgLoader.loadImages();
	
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");
	lineSpan = document.getElementById("lines");
	
	previousTime = currentTime = 0;
	
	document.onkeydown = getInput;
}

// Controls for the game.
function getInput(e) {
	if(!e) { var e = window.event; }
	
	// Preventing the defult browser controls to prevent unwanted scrolling.
	e.preventDefault();
	
	if(isGameOver != true) {
		switch(e.keyCode) {
			
			// 2 different keycodes so both arrows and WASD work for moving pieces.
			case 65: {}
			case 37: 
			if(checkMove(ourPiece.gridX - 1, ourPiece.gridY, ourPiece.curState)) {
				ourPiece.gridX--;
			}
			break;
			
			case 68: {}
			case 39:
			if(checkMove(ourPiece.gridX + 1, ourPiece.gridY, ourPiece.curState)) {
				ourPiece.gridX++;
			}
			break;
			
			case 87: {}
			case 38:
			{
			var newState = ourPiece.curState - 1;
			
			if(newState < 0) 
				newState = ourPiece.states.length - 1;
			
			
			if(checkMove(ourPiece.gridX, ourPiece.gridY, newState)) 
				ourPiece.curState = newState;
			}
			break;
			
			case 83: {}	
			case 40:
			if(checkMove(ourPiece.gridX, ourPiece.gridY + 1, ourPiece.curState)) {
				ourPiece.gridY++;
			}
			break;
		}
	}
	else {
		// If game is over send score to highscore update function and inform player of his achievings and ask if he wants to play again.
		updateHiScore(score);
		var newGame = prompt("You got " + currentLines + " lines. \nYour score was: " + score + "\nStart new game? (y/n)");
		if(newGame === "y") {
			initGame();
		} 
	}
}

// Function to get the personal best from database using AJAX.
function fetchHiScore() {
	if(window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onload = function() {
		var topscore = this.responseText;
		highscore = topscore.replace(/"/ig,"");
	};
	
	xmlhttp.open("GET","../php/tatris_fetchingHighScore.php",true);
	xmlhttp.send();
}

// Function to update the highscore on db when game ends.
function updateHiScore(newScore) {
	if(window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	// Sends the score to separate php file which will get the old highscore from database and compares the two, if the new score is higher it will update the database.
	xmlhttp.open("GET","../php/tatris_updatescore.php?s="+newScore,true);
	xmlhttp.send();
}

function onImagesLoaded(e) {
	blockImg = imgLoader.getImageAtIndex(0);
	backgroundImg = imgLoader.getImageAtIndex(1);
	gameOverImg = imgLoader.getImageAtIndex(2);
	
	initGame();
}

// Initializing game, setting score and lines to 0 and setting game over to false.
function initGame() {
	fetchHiScore();
	var r, c;
	currentLines = 0;
	score = 0;
	isGameOver = false;
	
	// Checking if game data isn't defined then define a new array for it, otherwise zero it out.
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
	
	// Get a random starting piece.
	ourPiece = getRandomPiece();
	
	// Printing lines, score, and highscore to screen.
	lineSpan.innerHTML = currentLines.toString();
	document.getElementById("points").innerHTML = score.toString();
	document.getElementById("highscore").innerHTML = highscore.toString();
	
	// Animation frame for different browsers.
	var requestAFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || 
								window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
	window.requestAnimationFrame = requestAFrame;
	
	// Starting the actual gameplay loop.
	requestAnimationFrame(update);
}

// The core gameplay loop.
function update() {
	currentTime = new Date().getTime();
	
	// Tying the speed of the game to lines cleared. Every 50 lines reduces the time between block movements by 50ms.
	var speed = 500 - ((Math.floor(currentLines / 50) * 0.1) * 500);
	
	// Checking if enough time has passed to move the block down a row and if so is it a valid move. If it is move the block, if not copy the blocks data to gamedata and get new block.
	if(currentTime - previousTime > speed) {
		if(checkMove(ourPiece.gridX, ourPiece.gridY + 1, ourPiece.curState)) {
			ourPiece.gridY++;
		} else {
			copyData(ourPiece);
			ourPiece = getRandomPiece();
		}
		
		previousTime = currentTime;
	}
	
	// All the drawing of board and blocks.
	ctx.clearRect(0, 0, 320, 640);
	drawBoard();
	drawPiece(ourPiece);
	
	// If game is over draw the game over screen, if not continue the gameplay.
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
	
	// Setting the squares where the block landed to be "full".
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
	
	// If piece is above the highest line, set game over to true.
	if(piece.gridY < 0) {
		isGameOver = true;
	}
}

// Function to check for full lines.
function checkLines() {
	var concurrentLines = 1;
	var lineFound = false;
	var fullRow = true;
	var r = rows - 1;
	var c = columns - 1;
	
	// Checking rows one by one from bottom to top to find full lines.
	while(r >= 0) {
		while(c >= 0) {
			// If a square is "empty" then the line can't be full so move on to next row.
			if(gameData[r][c] == 0) {
				fullRow = false;
				c = -1;
			}
			c--;
		}
		// If all the squares were "full" call function to remove the line, add score, and add cleared lines. ConcurrentLines used as a multiplier on score when multiple lines cleared at once.
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
		// If your current score is higher than the old highscore from server, update the "personal best" while playing.
		if (score > highscore) {
			highscore = score;
			document.getElementById("highscore").innerHTML = score.toString();
		}
	}
}

// Function to clear full rows.
function zeroRow(row) {
	var r = row;
	var c = 0;
	
	// Start from the given "full row" and copy square by square the data from above line and move upwards to the top.
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

// Function to draw the board.
function drawBoard() {
	// Background grid.
	ctx.drawImage(backgroundImg, 0, 0, 320, 640, 0, 0, 320, 640);
	
	// Drawing the "stationary" already stopped blocks from game data.
	for(var r = 0; r < rows; r++) {
		for(var c = 0; c < columns; c++) {
			if(gameData[r][c] != 0) {
				ctx.drawImage(blockImg, (gameData[r][c] - 1) * size, 0, size, size, c * size, r * size, size, size);
			}
		}
	}
}

// Drawing the piece.
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

// Function to check if the move or the rotation of the block is a legal move.
function checkMove(xPos, yPos, newState) {
	var result = true;
	var newX = xPos;
	var newY = yPos;
	
	for(var r = 0, len = ourPiece.states[newState].length; r < len; r++) {
		for(var c = 0, len2 = ourPiece.states[newState][r].length; c < len2; c++) {
			// If a square of the block is outside the left-right confines of the gameboard then the move is invalid.
			if(newX < 0 || newX >= columns) {
				result = false;
				c = len2;
				r = len;
			}
			
			// This if checks that any given square of the block isn't already occupied by a previous block in game data.
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
		
		// If the new row would be below the last line of the gameboard the move is again invalid.
		if(newY > rows) {
			r = len;
			result = false;
		}
	}
	return result;
}
