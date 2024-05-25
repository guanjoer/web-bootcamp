const gameData = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
];

let editedPlayer = 0;
let activePlayer = 0;
let currnetRound = 1;
let gameIsOver = false;

const players = [
	{
		name: '',
		symbol: 'X'
	},
	{
		name: '',
		symbol: 'O'
	}
];

// To Access HTML Elements
const playerConfigOverlay = document.getElementById('config-overlay');
const backdropElement = document.getElementById('backdrop');
const formElement = document.querySelector('form');
const errorsConfig = document.getElementById('errors-config');
const gameArea = document.getElementById('active-game');
let activePlayerName = document.getElementById('active-player');
const gameOver = document.getElementById('game-over');

// Button role
const editPlayer1Btn = document.getElementById('edit-player-1-btn');
const editPlayer2Btn = document.getElementById('edit-player-2-btn');
const cancleConfigBtn = document.getElementById('cancel-config-btn');
const startGameBtn = document.getElementById('start-game-btn');
const gameFields = document.querySelectorAll('#game-board li');


// Events
editPlayer1Btn.addEventListener('click', openPlayerConfig);
editPlayer2Btn.addEventListener('click', openPlayerConfig);

cancleConfigBtn.addEventListener('click', closePlayerConfig);
backdropElement.addEventListener('click', closePlayerConfig);

formElement.addEventListener('submit', savePlayerConfig);

startGameBtn.addEventListener('click', startNewGame);

for (const element of gameFields) {
	element.addEventListener('click', selectGameField);
}