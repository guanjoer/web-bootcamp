function checkAuthStatus(req, res, next) {
	const uid = req.session.uid;
	const userName = req.session.name;


	// i.e. User is authenticated!
	if(!uid) {
		return next();
	};

	res.locals.uid = uid;
	res.locals.name = userName;
	res.locals.isAuthenticated = true;
	next();
};

module.exports = checkAuthStatus;