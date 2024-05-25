function openPlayerConfig(event) {
	editedPlayer = +event.target.dataset.playerid;
	playerConfigOverlay.style.display = 'block';
	backdropElement.style.display = 'block';
}

function closePlayerConfig() {
	playerConfigOverlay.style.display = 'none';
	backdropElement.style.display = 'none';
	formElement.firstElementChild.classList.remove('error');
	errorsConfig.textContent = '';
	formElement.firstElementChild.lastElementChild.value = ''; // formElement.getElementById('player-name');
}

function savePlayerConfig(event) {
	event.preventDefault(); // Not to submit data to server
	const formData = new FormData(event.target);
	const enteredPlayername = formData.get('playername').trim();

	if (!enteredPlayername || enteredPlayername === players[0].name || enteredPlayername === players[1].name) { // enteredPlayername === '';
		event.target.firstElementChild.classList.add('error');
		errorsConfig.textContent = 'Please enter a valid name!';
		return;
	}

	const updatePlayerName = document.getElementById('player-' + editedPlayer + '-data');

	
	updatePlayerName.children[1].textContent = enteredPlayername;

	players[editedPlayer - 1].name = enteredPlayername;

	closePlayerConfig();
}