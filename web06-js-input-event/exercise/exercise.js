// Practice what you learned!

// 1) Select the two <button> elements and store them in two different variables.
//    - Select the first button without adding or using any "id"
var firstButton = document.body.children[2].children[4];
//    - Select the second button by using an "id"

var secondButton = document.getElementById('second-btn');

// 2) Add "click" event listener to both buttons (with two different functions).
//    The functions should "console.dir()" the clicked buttons.
//    - Output the first button by using the variable in which it's stored
function printConsoleWithVar() {
	console.dir(firstButton);
}

firstButton.addEventListener('click', printConsoleWithVar);
//    - Output the second button WITHOUT using the variable in which it's stored

function printConsoleWithoutVar(event) {
	console.dir(event.target);
}

secondButton.addEventListener('click', printConsoleWithoutVar);
// 3) Now select and store the paragraphs mentioned in the text you see on the page
//    (first and third paragraph)
//    - Select BOTH paragraphs by drilling into the document and "navigating" to the
//      mentioned elements
//    - If you struggle with DOM drilling, use "ids" instead but watch the solution!

let firstParagraph = document.body.children[2].children[1];
let thirdParagraph = document.body.children[2].children[3];
// 4) Change the functions from (2) such that:
//    - The first button removes the third paragraph (i.e. the <p> prior to it)

// function deleteParagraph() {
// 	thirdParagraph.remove();
// }

// firstButton.addEventListener('click', deleteParagraph);
//    - The second button changes the background color of the first paragraph to blue

// function changeBackgroundColor() {
// 	firstParagraph.style.backgroundColor = '#D5F3FE'
// }

// secondButton.addEventListener('click', changeBackgroundColor);

// 5) Solve (4) both by changing the "inline styles" as well as by adding CSS classes
//    Note: You'll have to add those classes to the styles.css file first!

function deleteParagraph() {
	thirdParagraph.remove();
}

firstButton.addEventListener('click', deleteParagraph);

function changeBackgroundColor() {
	// firstParagraph.style.backgroundColor = '#D5F3FE'
	firstParagraph.classList.add('control');
}

secondButton.addEventListener('click', changeBackgroundColor);

