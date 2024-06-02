const bcrypt = require('bcryptjs');


const db = require('../data/database');


class User {
	constructor(email, password, fullname, postalCode, addressBasic, addressDetail) {
		this.email = email;
		this.password = password;
		this.name = fullname;
		this.address = {
			postalCode: postalCode,
			addressBasic: addressBasic,
			addressDetail: addressDetail
		}
		
	};

	async signup() {
		const hashedPassword =  await bcrypt.hash(this.password, 12);

		await db.getDb().collection('users').insertOne({
			email: this.email,
			passowrd: hashedPassword,
			name: this.name,
			address: this.address
		});


	};
};


module.exports = User;