const fs = require('fs/promises');

async function readFile() {
	let fileData;

	fileData = await fs.readFile('data.txt');
	console.log(fileData.toString());
}

readFile();
console.log('Hello');