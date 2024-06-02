const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
	const client = await MongoClient.connect(
		'mongodb://localhost:27017'
	);

	database = client.db('yourDbName');
};

function getDb() {
	if(!database) {
		throw new Error('MongoDB 서버와의 연결을 확인하세요!');
	};

	return database;
};

module.exports = {
	connectToDatabase: connectToDatabase,
	getDb: getDb
};