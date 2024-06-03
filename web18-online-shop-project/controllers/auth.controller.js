const User = require('../models/auth.model');

const authUtil = require('../util/authentication');

function getSignup(req, res) {
	res.render('customer/auth/signup');
};

async function signup(req, res, next) {
	const user = new User(
		req.body.email,
		req.body.password,
		req.body.fullname,
		req.body.postalCode,
		req.body.address,
		req.body.addressDetail);

		try {
			await user.signup();
		} catch (error) {
			next(error); // Activate error handler middleware
			return;
		};

		res.redirect('/login');
};

function getLogin(req, res) {
	res.render('customer/auth/login');
};

async function login(req, res, next) {
	const user = new User(req.body.email, req.body.password);

	let existingUser;
	try {
		 existingUser = await user.getUserWithEmail();
	} catch (error) {
		next(error);
		return;		
	};


	// Check the entered email exists in the database. // i.e Validation test for email.
	if(!existingUser) {
		res.redirect('/login');
		return;
	};

	// Check the same between entered password and hashed password stored in DB.
	const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);

	if(!passwordIsCorrect) {
		res.redirect('/login');
		return;
	};

	authUtil.createUserSession(req, existingUser, function() {
		res.redirect('/');
	});
};

function logout(req, res) {
	authUtil.destroyUserSession(req);
	res.redirect('/login');
};



module.exports = {
	getSignup: getSignup,
	getLogin: getLogin,
	signup:signup,
	login: login,
	logout: logout
};