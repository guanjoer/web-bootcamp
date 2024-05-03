
// person = {
// 	name: 'MrGuanJo',
// 	greeting() {
// 		alert('Hello JavaScript World!')
// 	}
// }

// console.log(person.name)

// console.log(window.document)

// console.dir(window.document);

// document.body.children[0].firstChild.textContent = "This is modified by JavaScript"
// document.body.children[1].children[0].href = 'https://google.com';

// console.dir(window.document);

let newAnchorElement = document.createElement('a');

let secondParagraph = document.querySelectorAll('.paragraph')[1];

secondParagraph.append(newAnchorElement);

newAnchorElement.href = 'https://google.com';
newAnchorElement.textContent = 'Go to Google';

// Remove specific element
let firsth1Element = document.querySelector('h1');
// first1Element.remove();

// Move the specific element
// firsth1Element.parentElement.append(firsth1Element);

let firstParagraph = document.querySelectorAll('.paragraph')[0];

console.log(firstParagraph.innerHTML)
