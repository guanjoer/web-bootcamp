// Built-in pakages
const path = require('path');

// Thrid-party pakages
const express = require('express');
const app = express();

// My own files
const defaultRoutes = require('./routes/default');
const restaurantsRoutes = require('./routes/restaurants');

// HTML files Dynamic Handling
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static files & form data Handling
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

// Router Handling
app.use('/', defaultRoutes);
app.use('/', restaurantsRoutes);


// Error Handling
app.use(function(req, res) {
	res.status(404).render('404');
});

app.use(function(error, req, res, next) {
	res.status(500).render('500');
});

app.listen(3000);