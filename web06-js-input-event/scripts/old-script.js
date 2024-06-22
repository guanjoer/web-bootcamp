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
