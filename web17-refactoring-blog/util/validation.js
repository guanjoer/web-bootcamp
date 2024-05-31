function postIsValid(enteredTitle, enteredContent) {
	return (
		enteredTitle &&
		enteredContent &&
		enteredTitle.trim() !== '' &&
		enteredContent.trim() !== ''
);
};


function userCredentialAreValid(email, confirmEmail, password) {
	return (
		email &&
		confirmEmail &&
		password &&
		password.trim().length >= 6 &&
		email === confirmEmail &&
		email.includes('@')
	);
}

module.exports = {
	postIsValid: postIsValid,
	userCredentialAreValid: userCredentialAreValid
};