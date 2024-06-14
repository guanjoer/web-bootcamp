const session = require('express-session');
const Cart = require('../models/cart.model');

function intializeCart(req, res, next) {
	let cart;

	if(!req.session.cart) {
		cart = new Cart();
	} else {
		const sessionCart = req.session.cart;
		cart = new Cart(
			sessionCart.items,
			+sessionCart.totalQuantity,
			+sessionCart.totalPrice
		)
		// console.log(sessionCart)
		// console.log(cart)
	
	}

	res.locals.cart = cart;
	// console.log(res.locals.cart);

	next();
}


module.exports = intializeCart;