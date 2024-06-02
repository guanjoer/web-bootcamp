function getSignup(req, res) {
	res.render('customer/auth/signup');
};

function signup(req, res) {

};

function getLogin(req, res, next) {

};



module.exports = {
	getSignup: getSignup,
	getLogin: getLogin,
	signup:signup
};