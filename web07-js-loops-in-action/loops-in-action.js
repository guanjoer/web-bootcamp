//JavaScript Calculator

const sumButton = document.querySelector('#calculator button');
const sumResult = document.getElementById('calculated-sum');


function sumNumbers() {
	const numberInputElement = document.getElementById('user-number');
	const inputNumber = numberInputElement.value;

	let sumUpToNumber = 0;

	for (let i = 0; i <= inputNumber; i += 1) {
		sumUpToNumber += i;

	}

	sumResult.textContent = sumUpToNumber;
	sumResult.style.display = 'block';
}

sumButton.addEventListener('click', sumNumbers);

// Highlight Links

const highlightButton = document.querySelector('#highlight-links button');

function hightlightAnchor() {
	const anchorElements = document.querySelectorAll('#highlight-links a');

	for (let element of anchorElements) {
		if (element.className !== 'highlight') {
			element.classList.add('highlight');
	} else {
		element.classList.remove('highlight')
	}
	}

}

highlightButton.addEventListener('click', hightlightAnchor)

// User Information

const userData = {
	name: 'MrGuanJo',
	copyright:'(c) 2024 MrGuanJo All Rights Reserved'
};

const userDataButton = document.querySelector('#user-data button');

function outputUserData() {
	const outputUnorderdList = document.getElementById('output-user-data');

	outputUnorderdList.innerHTML = '';

	for (const key in userData) {
		const createListElement = document.createElement('li');

		const outputText = key.toUpperCase() + ': ' + userData[key];
		createListElement.textContent = outputText;
		outputUnorderdList.append(createListElement);
}
}

userDataButton.addEventListener('click', outputUserData)

// Statistics (Roll the Dice)

const rollDiceButton = document.querySelector('#statistics button');


function rollDice() {
	return Math.floor(Math.random()*6) + 1;
}

function deriveNumber() {
	const inputElement = document.getElementById('user-target-number');
	const rollUnorderedList = document.getElementById('dice-rolls');

	const enteredNumber = inputElement.value;

	rollUnorderedList.innerHTML = '';
	
	let hasRolledTargetNumber = false;
	let numberOfRolls = 0;

	while (!hasRolledTargetNumber) {
		const rolledNumber = rollDice();

		numberOfRolls++;
		const newRollList = document.createElement('li');
		const outputText = 'Roll ' + numberOfRolls + ': ' + rolledNumber;
		newRollList.textContent = outputText;
		rollUnorderedList.append(newRollList);
		hasRolledTargetNumber = rolledNumber == enteredNumber;
	}
	const outputTotalRolls = document.getElementById('output-total-rolls');
	const outputTargetNumber = document.getElementById('output-target-number');

	outputTargetNumber.textContent = enteredNumber;
	outputTotalRolls.textContent = numberOfRolls;

}

rollDiceButton.addEventListener('click', deriveNumber);