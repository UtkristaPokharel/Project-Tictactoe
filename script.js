// Select all elements with the class "gridbox" and the reset button by ID
const gameBtn = document.querySelectorAll(".gridbox");
const resetBtn = document.getElementById('reset');

// Initialize game state variables
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = null;

// Player factory function to create player objects with a symbol and score
const Player = function (symbol) {
	let score = 0;
	return { symbol, score };
};

// Create human and AI players with their respective symbols
const playerHuman = Player('X');
const playerAi = Player('O');

// Define winning patterns for the game
const winningPatterns = [
	[0, 1, 2],
	[0, 3, 6],
	[0, 4, 8],
	[1, 4, 7],
	[2, 5, 8],
	[2, 4, 6],
	[3, 4, 5],
	[6, 7, 8]
];

// Add click event listeners to each grid box
gameBtn.forEach((gridbox, index) => {
	gridbox.addEventListener("click", () => {
		// Only allow a move if the game is active, the cell is empty, and it's the human's turn
		if (gameActive && board[index] === "" && currentPlayer === playerHuman) {
			makeMove(index, playerHuman);
			// If the game is still active after the move, let the AI make its move after a delay
			if (gameActive) {
				setTimeout(Ai, 500);
			}
		}
	});
});

// Function to make a move on the board
function makeMove(index, player) {
	gameBtn[index].textContent = player.symbol;
	// Set the color of the symbol based on the player
	if (player.symbol === "O") {
		gameBtn[index].setAttribute("style", "color: rgb(223, 145, 0);");
	} else {
		gameBtn[index].setAttribute("style", "color: #c1c1c1;");
	}
	board[index] = player.symbol;
	gameBtn[index].disabled = true;
	checkWin();
	// Switch the current player
	currentPlayer = currentPlayer === playerHuman ? playerAi : playerHuman;
}

// AI move function using the minimax algorithm
function Ai() {
	let bestMove = minimax(board, playerAi).index;
	makeMove(bestMove, playerAi);
}

// Minimax algorithm to determine the best move for the AI
function minimax(newBoard, player) {
	let availSpots = newBoard.reduce((acc, val, idx) => val === "" ? acc.concat(idx) : acc, []);

	// Base cases: check if there's a winner or if the game is a tie
	if (checkWinner(newBoard, playerHuman.symbol)) {
		return { score: -10 };
	} else if (checkWinner(newBoard, playerAi.symbol)) {
		return { score: 10 };
	} else if (availSpots.length === 0) {
		return { score: 0 };
	}

	let moves = [];
	for (let i = 0; i < availSpots.length; i++) {
		let move = {};
		move.index = availSpots[i];
		newBoard[availSpots[i]] = player.symbol;

		// Recursively call minimax for the next player
		if (player.symbol === playerAi.symbol) {
			move.score = minimax(newBoard, playerHuman).score;
		} else {
			move.score = minimax(newBoard, playerAi).score;
		}

		newBoard[availSpots[i]] = "";
		moves.push(move);
	}

	// Determine the best move based on the player
	let bestMove;
	if (player.symbol === playerAi.symbol) {
		let bestScore = -10000;
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		let bestScore = 10000;
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	return moves[bestMove];
}

// Function to check if a player has won
function checkWinner(board, player) {
	return winningPatterns.some(pattern => pattern.every(index => board[index] === player));
}

// Function to update and display scores
function displayScores() {
	const playerscore = document.querySelector(".player-score");
	const Aiscore = document.querySelector(".AI-score");
	playerscore.textContent = playerHuman.score;
	Aiscore.textContent = playerAi.score;
}

// Function to check for a win or a tie after each move
function checkWin() {
	let windetected = false;
	for (let i = 0; i < winningPatterns.length; i++) {
		let [a, b, c] = winningPatterns[i];
		if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
			// Highlight the winning pattern
			gameBtn[a].style.border = "3px solid green";
			gameBtn[a].style.boxShadow = "green 0px 0px 5px 3px";
			gameBtn[b].style.border = "3px solid green";
			gameBtn[b].style.boxShadow = "green 0px 0px 5px 3px";
			gameBtn[c].style.border = "3px solid green";
			gameBtn[c].style.boxShadow = "green 0px 0px 5px 3px";
			currentPlayer.score++;
			displayScores();
			gameActive = false;
			windetected = true;
			setTimeout(() => {
				newTurn();
				clearStyles();
			}, 2000);
		}
	}
	if (!windetected && !board.includes("")) {
		// Handle tie situation
		for (let c = 0; c < gameBtn.length; c++) {
			let gridbox = gameBtn[c];
			gridbox.style.boxShadow = "white 0px 0px 5px 3px";
		}
		gameActive = false;
		setTimeout(() => {
			newTurn();
			clearStyles();
		}, 2000);
	}
}

// Function to clear styles from the grid boxes
function clearStyles() {
	for (let gridbox of gameBtn) {
		gridbox.style.border = "";
		gridbox.style.boxShadow = "";
		gridbox.disabled = false;
	}
}

// Function to start a new turn
function newTurn() {
	gameActive = true;
	board = ["", "", "", "", "", "", "", "", ""];
	currentPlayer = playerHuman;
	document.querySelectorAll(".gridbox").forEach(gameBtn => gameBtn.textContent = "");
}

// Function to reset the game
function resetGame() {
	board = ["", "", "", "", "", "", "", "", ""];
	playerHuman.score = 0;
	playerAi.score = 0;
	displayScores();
	currentPlayer = playerHuman;
	document.querySelectorAll(".gridbox").forEach(gameBtn => gameBtn.textContent = "");
}

// Add event listener to the reset button to reset the game when clicked
resetBtn.addEventListener('click', () => {
	if (gameActive) {
		resetGame();
	}
});

// Initialize the game
resetGame();
