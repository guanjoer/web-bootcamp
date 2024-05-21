const fs = require('fs'); // Node JS Built-in Pakage
const path = require('path');

const express = require('express');
const app = express();

function templateHTML() {
	return `
	<form action="/store-user" method="POST">
		<p>
			<label for="name">Your Name</label>
		</p>
		<p>
			<input id="name" name="username" type="text"/>
		</p>
		<button type="submit">Submit</button>
	</form>
	`
}

// raw text data(attached http-post request data in form) to JS Object(i.e possibly can use in JS) or Array
app.use(express.urlencoded({extended: false}));

app.get('/current-time', function(req, res) {
	res.send('<h1>'+  new Date().toISOString() +'</h1>')
});

app.get('/', function(req,res) {
	res.send(templateHTML());
});

app.post('/store-user', function(req, res) {
	const userName = req.body.username;
	// console.log(userName);

	const filePath = path.join(__dirname, 'data', 'users.json');

	const fileData = fs.readFileSync(filePath);
	const existingUsers = JSON.parse(fileData);

	existingUsers.push(userName);

	fs.writeFileSync(filePath, JSON.stringify(existingUsers));
	res.send('Success that stored User Data!');
});

app.get('/users', function(req, res) {
	const filePath = path.join(__dirname, 'data', 'users.json');

	const fileData = fs.readFileSync(filePath);
	const existingUsers = JSON.parse(fileData);

	let responseData = '<ul>';

	for (const user of existingUsers) {
		responseData += `<li>${user}</li>`;
	}

	responseData += '</ul>';

	res.send(responseData);
})

app.listen(3000);

