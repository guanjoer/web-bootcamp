const path = require('path');

const express = require('express');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session');

const blog = require('./routes/index');
const db = require('./data/database');

const MongoDBStore = mongodbStore(session);

const app = express();

const sessionStore = new MongoDBStore({
	uri: 'mongodb://localhost:27017',
	databaseName: 'blog-version-2',
	collection: 'sessions'
  });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session({
	secret: 'secret-key',
	resave: false,
	saveUninitialized: false,
	store: sessionStore,
	cookie: {
	  maxAge: 60 * 1000 * 60 * 24 * 30 // 30 days // ms is default value unit
	}
  }));

  app.use(async function(req, res, next) {
	const user = req.session.user;
	const isAuth = req.session.isAuthenticated;
  
	if(!user || !isAuth) {
	  return next();
	};
	
	res.locals.isAuth = isAuth;

	next();
  });

app.use(blog);


db.connectToDatabase().then(function () {
	app.listen(3000);
  });

