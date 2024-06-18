const expressSession = require('express-session');
const mongodbStore = require('connect-mongodb-session');

function createSessionStore() {
	const MongoDBStore = mongodbStore(expressSession);

	const store = new MongoDBStore({
		uri: process.env.MONGODB_URL,
		databaseName: process.env.DB_NAME,
		collection: 'sessions'
	});

	return store;
};

function createSessionConfig() {
	return {
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: createSessionStore(),
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 30 // Default unit is ms.
		}
	};
};


module.exports = createSessionConfig;