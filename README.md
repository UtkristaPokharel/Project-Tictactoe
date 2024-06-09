# Tic Tac Toe Game

This Tic Tac Toe game features a human player (X) against an AI opponent (O). The AI uses the Minimax algorithm to determine the best possible moves, providing a challenging game for the human player. The game interface includes a scoreboard to keep track of scores and a reset button to restart the game.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [AI Logic](#ai-logic)
5. [Technologies Used](#technologies-used)
6. [Acknowledgements](#acknowledgements)

## Features

- **Human vs AI Gameplay**: The player can play against an AI opponent.
- **Score Tracking**: The scores for the human player and AI are displayed and updated.
- **Winning Detection**: The game detects win conditions and highlights the winning pattern.
- **Tie Detection**: The game detects tie conditions and indicates when the board is full without a winner.
- **Reset Functionality**: The game can be reset to start a new game, and scores are reset as well.

## Installation

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/yourusername/tic-tac-toe.git
    ```
2. Navigate to the project directory:
    ```bash
    cd tic-tac-toe
    ```

## Usage

1. Open the `index.html` file in your web browser to start the game.
2. Click on any of the grid boxes to make your move as the human player (X).
3. The AI will automatically make its move after a brief delay.
4. The game will detect and highlight winning patterns or indicate a tie.
5. Click the "Reset" button to restart the game and reset the scores.

## AI Logic

The AI uses the Minimax algorithm to make decisions. This ensures the AI makes optimal moves, making it a challenging opponent. The Minimax algorithm evaluates all possible moves and selects the one that maximizes the AI's chances of winning while minimizing the human player's chances.

```javascript
function Ai() {
	let bestMove = minimax(board, playerAi).index;
	makeMove(bestMove, playerAi);
}

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
```

## Technologies Used

- HTML
- CSS
- JavaScript

## Acknowledgements

The AI logic in this project was implemented with the help of ChatGPT. I'm still learning AI and this project has been a valuable learning experience. Thank you to OpenAI for providing such an amazing tool!

Feel free to customize and improve the game. Happy coding!
