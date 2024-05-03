// //Click Event

// let firstParagraph = document.querySelector('p');

// function modifyParagraphText() {
// 	firstParagraph.textContent = 'Cliked!';
// 	console.log('Paragraph Cliked!!!');
// }

// // modifyParagraphText()

// firstParagraph.addEventListener('click', modifyParagraphText);

// // About input field
// let firstInput = document.querySelector('input');

// function keyboardEvent(test) {
// 	console.log(firstInput.value);
// 	console.log(test);
// 	console.log(test.target.value);
// } 

// firstInput.addEventListener('input', keyboardEvent);

const productNameInput = document.querySelector('#product-name');
const remainingCharsElement = document.querySelector('#remainder');

const maxAllowedChars = productNameInput.maxLength;

function updateRemaingChars(event) {
	const enteredText = event.target.value;
	const enteredTextLength = enteredText.length;

	const remainingChars = maxAllowedChars - enteredTextLength;

	remainingCharsElement.textContent = remainingChars;

	if (remainingChars === 0) {
		productNameInput.classList.add('error');
		remainingCharsElement.classList.add('error');
	} else if (remainingChars < 10) {
		productNameInput.classList.add('warning');
		remainingCharsElement.classList.add('warning');
		productNameInput.classList.remove('error')
		remainingCharsElement.classList.remove('error');
	} else {
		productNameInput.classList.remove('warning')
		remainingCharsElement.classList.remove('warning');
	}
}



productNameInput.addEventListener('input', updateRemaingChars);


const typedTextLength = productNameInput.value.length;




