const User = require('../models/auth.model');

const authUtil = require('../util/authentication');
const validationUtil = require('../util/validation');
const sessionFlashUtil = require('../util/session-flash');
const session = require('express-session');

function getSignup(req, res) {
	let flashedData = sessionFlashUtil.getSessionData(req);

	// First get request to signup page
	if(!flashedData) {
		flashedData = {
			errorMessage: '',
			email: '',
			confirmEmail: '',
			password: '',
			confirmPassword: '',
			fullname: '',
			postalCode: '',
			address: '',
			addressDetail: ''
		}
	};
	res.render('customer/auth/signup', {flashedData: flashedData});
};

async function signup(req, res, next) {
		enteredData = {
			email: req.body.email,
			confirmEmail: req.body['confirm-email'],
			password: req.body.password,
			confirmPassword: req.body['confirm-password'],
			fullname: req.body.fullname,
			postalCode: req.body.postalCode,
			address: req.body.address,
			addressDetail: req.body.addressDetail
		}

		// 입력 데이터가 공백이거나 비밀번호가 7자리 미만인지 혹은 이메일, 비밀번호와 confirm-email, confirm-password의 값이 같은지 확인
		if(!validationUtil.userDetailsAreValid(
			req.body.email,
			req.body.password,
			req.body.fullname,
			req.body.postalCode,
			req.body.address,
			req.body.addressDetail
		) || !validationUtil.emailIsConfirmed(
			req.body.email,
			req.body['confirm-email']
		) || !validationUtil.passwordIsConfirmed(
			req.body.password,
			req.body['confirm-password']
		)
		) {
			sessionFlashUtil.flashDataToSession(req, {
				errorMessage: '이메일 및 비밀번호, 개인정보 입력을 확인하세요!',
				...enteredData	
			}, function() {
				res.redirect('/signup')
			})
			return;
		}

		const user = new User(
			req.body.email,
			req.body.password,
			req.body.fullname,
			req.body.postalCode,
			req.body.address,
			req.body.addressDetail);

		try {
			// DB의 users 컬렉션에 입력한 이메일이 이미 존재하는지 확인.
			const existsAlready = await user.existsAlready();
			if(existsAlready) {
				sessionFlashUtil.flashDataToSession(req, {
					errorMessage: '이미 존재하는 이메일 입니다.',
					...enteredData	
				}, function() {
					res.redirect('/signup')
				})
				return;
			}

			// 입력한 데이터를 DB의 users 컬렉션에 삽입.
			await user.signup();
		} catch (error) {
			next(error); // Activate error handler middleware
			return;
		};

		res.redirect('/login');
};

function getLogin(req, res) {
	let flashedData = sessionFlashUtil.getSessionData(req);

	if(!flashedData) {
		flashedData = {
			email: '',
			password: '',
		}
	};
	res.render('customer/auth/login', {flashedData: flashedData});
};

// 이메일 중복확인 with Ajax
async function emailIsExisted(req, res, next) {
	const email = req.body.email.trim();

	if(!email) {
		return res.json({exists: null, message: '이메일을 입력해주세요.'});
	} else if (!email.includes('@')) {
		return res.json({ exists: null, message: '@를 포함하여 이메일을 입력해주세요.' });
	};

	const user = new User(email);

	let existingUser;
	try {
		existingUser = await user.getUserWithEmail();
	} catch (error) {
		next(error);
		return;
	};



	if(existingUser) {
		// res.redirect('/signup')
		res.json({exists: true})
	} else {
		res.json({exists: false});
	}
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

	const sessionErrorData = {
		errorMessage: '이메일 및 비밀번호를 확인하세요!',
		email: user.email,
		password: user.password
	};

	// Check the entered email exists in the database. // i.e Validation test for email.
	if(!existingUser) {
		sessionFlashUtil.flashDataToSession(req, sessionErrorData, function() {
			res.redirect('/login');
		})
		return;
	};

	// Check the same between entered password and hashed password stored in DB.
	const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);

	if(!passwordIsCorrect) {
		sessionFlashUtil.flashDataToSession(req, sessionErrorData, function() {
			res.redirect('/login');
		})
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
	emailIsExisted: emailIsExisted,
	getLogin: getLogin,
	signup:signup,
	login: login,
	logout: logout
};