const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
	const client =  await MongoClient.connect('mongodb://127.0.0.1:27017');
	database = client.db('yourDbName');
};

function getDb() {
	if(!database) {
		throw {message: 'Database is not connected!'};
	}

	return database;
}

module.exports = {
	connectToDb: connect,
	getDb: getDb
};
