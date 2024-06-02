const User = require('../models/auth.model');

function getSignup(req, res) {
	res.render('customer/auth/signup');
};

async function signup(req, res) {
	const user = new User(
		req.body.email,
		req.body.password,
		req.body.fullname,
		req.body.postalCode,
		req.body.address,
		req.body.addressDetail);

		await user.signup();

		res.redirect('/login');
};

function getLogin(req, res, next) {
	res.render('customer/auth/login');
};



module.exports = {
	getSignup: getSignup,
	getLogin: getLogin,
	signup:signup
};