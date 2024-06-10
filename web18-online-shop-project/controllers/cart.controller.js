const Product = require('../models/product.model');

async function addToCart(req, res, next) {
	let product;
	try {
		product = await Product.findById(req.body.productId);
	} catch (error) {
		error.code = 404;
		next(error);
	}

	const cart = res.locals.cart // Cart 객체 생성
	cart.addItem(product); // Cart 객체 property 업데이트
	req.session.cart = cart; // 세션에 cart 데이터 저장

	res.status(201).json({
		message: 'Cart updated.',
		newTotalItems: cart.totalQuantity
	});
};

function getCart(req, res, next) {
	const cart = res.locals.cart;
	console.log(cart);
	const formattedItems = cart.getFormattedItems();
	const formattedTotalPrice = cart.getFormattedTotalPrice();
	res.render('customer/cart/cart', {
		cartItems: formattedItems,
		formattedTotalPrice: formattedTotalPrice
	});
}


module.exports = {
	addToCart: addToCart,
	getCart: getCart
}