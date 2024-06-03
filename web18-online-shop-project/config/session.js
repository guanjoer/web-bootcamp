const expressSession = require('express-session');
const mongodbStore = require('connect-mongodb-session');

function createSessionStore() {
	const MongoDBStore = mongodbStore(expressSession);

	const store = new MongoDBStore({
		uri: 'mongodb://localhost:27017',
		databaseName: 'online-shop',
		collection: 'sessions'
	});

	return store;
};

function createSessionConfig() {
	return {
		secret: 'secret-key',
		resave: false,
		saveUninitialized: false,
		store: createSessionStore(),
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 30 // Default unit is ms.
		}
	};
};


module.exports = createSessionConfig;