function createUserSession(req, user, action) {
	req.session.uid = user._id.toString();
	req.session.isAdmin = user.isAdmin;
	req.session.name = user.name;
	req.session.save(action);
};

function destroyUserSession(req) {
	req.session.uid = null;
	req.session.name = null;
	req.session.isAdmin = null;
};


module.exports = {
	createUserSession: createUserSession,
	destroyUserSession: destroyUserSession
};