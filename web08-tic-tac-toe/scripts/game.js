function resetGame() {
	activePlayer = 0;
	currnetRound = 1;
	gameIsOver = false;
	gameOver.firstElementChild.innerHTML = 'You won, <span id="winner-name">PLAYER NAME</span>!';
	gameOver.style.display = 'none';

	let gameBoardIndex = 0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			gameData[i][j] = 0;
			gameFields[gameBoardIndex].textContent = '';
			gameFields[gameBoardIndex].classList.remove('disabled');
			gameBoardIndex++;
		}
	}
}


function startNewGame() {
	if (players[0].name === '' || players[1].name === '') {
		alert('Please set the both player name!');
		return;
	}

	resetGame();

	activePlayerName.textContent = players[activePlayer].name;

	gameArea.style.display = 'block'
}

function switchPlayer() {
	if (activePlayer === 0) {
		activePlayer = 1;
	} else {
		activePlayer = 0;
	}

	activePlayerName.textContent = players[activePlayer].name;
}

function selectGameField(event) {
	if (gameIsOver) {
		return;
	}

	const selectField = event.target;
	const selectColumn = selectField.dataset.col - 1;
	const selectRow = selectField.dataset.row - 1;

	if (gameData[selectRow][selectColumn] > 0) {
		alert('Please select an empty field!');
		return;
	}

	selectField.textContent = players[activePlayer].symbol;
	selectField.classList.add('disabled');

	gameData[selectRow][selectColumn] = activePlayer + 1;

	const winnerId = checkForGameOver();
	console.log(winnerId);

	if (winnerId !== 0) {
		endGame(winnerId);
	}

	currnetRound++;

	switchPlayer();
}

function checkForGameOver() {
	// Checking for All Rows(3 Rows)
	for (let i = 0; i < 3; i++) {
		if (
			gameData[i][0] > 0 &&
			gameData[i][0] === gameData[i][1] &&
			gameData[i][1] === gameData[i][2]
		) {
			return gameData[i][0];
		}
	}

	// Checking for All Columns (3 Columns)
	for (let i = 0; i < 3; i++) {
		if (
			gameData[0][i] > 0 &&
			gameData[0][i] === gameData[1][i] &&
			gameData[1][i] === gameData[2][i]
		) {
			return gameData[0][i];
		}
	}

	// Diagonal: Top left to bottom right
	if (
		gameData[0][0] > 0 &&
		gameData[0][0] === gameData[1][1] &&
		gameData[1][1] === gameData[2][2]
	) {
		return gameData[0][0];
	}

	// Diagonal: Top right to bottom left
	if (
		gameData[0][2] > 0 &&
		gameData[0][2] === gameData[1][1] &&
		gameData[1][1] === gameData[2][0]
	) {
		return gameData[0][2];
	}

	if (currnetRound === 9) {
		return -1;
	}

	return 0;
}

function endGame(winnerId) {
	gameIsOver = true;
	gameOver.style.display = 'block';

	if (winnerId > 0) {
		const winnerName = players[winnerId - 1].name;
		gameOver.firstElementChild.firstElementChild.textContent = winnerName;
	} else {
		gameOver.firstElementChild.textContent = 'It \'s Draw!';
	}

}