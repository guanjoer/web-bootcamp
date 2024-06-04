function checkAuthStatus(req, res, next) {
	const uid = req.session.uid;
	const userName = req.session.name;
	const isAdmin = req.session.isAdmin;


	// i.e. User is authenticated!
	if(!uid) {
		return next();
	};

	res.locals.uid = uid;
	res.locals.name = userName;
	res.locals.isAdmin = isAdmin;
	res.locals.isAuthenticated = true;
	next();
};

module.exports = checkAuthStatus;