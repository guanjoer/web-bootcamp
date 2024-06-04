function isEmty(value) {
	return !value || value.trim() === '';
};


function userCredentialsAreValid(email, password) {
	return (
		email &&
		email.includes('@') &&
		password &&
		password.trim().length >= 7
	);
}


function userDetailsAreValid(email, password, name, postalCode, addressBasic, addressDetail) {
	return (
 		userCredentialsAreValid(email, password)&&
		!isEmty(name) &&
		!isEmty(postalCode) &&
		!isEmty(addressBasic) &&
		!isEmty(addressDetail)
	);
};

function emailIsConfirmed(email, confirmEmail) {
	return email === confirmEmail;
}


module.exports = {
	userDetailsAreValid: userDetailsAreValid,
	emailIsConfirmed: emailIsConfirmed
};