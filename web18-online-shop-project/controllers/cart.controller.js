const Product = require('../models/product.model');

async function addToCart(req, res, next) {
	let product;
	try {
		product = await Product.findById(req.body.productId); // Product 인스턴스
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

async function getCart(req, res, next) {
	// console.log(req.session.cart);
	const cart = res.locals.cart;
	// console.log(cart.totalPrice);
	const formattedItems = cart.getFormattedItems();
	const formattedTotalPrice = cart.getFormattedTotalPrice();

	// console.log(cart);
	res.render('customer/cart/cart', {
		cartItems: formattedItems,
		formattedTotalPrice: formattedTotalPrice,
		cartIsEmpty: cart.totalQuantity === 0
	});
}

async function updateCart(req, res, next) {
	const cart = res.locals.cart;
	const updatedItemData = await cart.updateItem(req.body.productId, +req.body.quantity);

	req.session.cart = cart;

	const formattedTotalPrice = cart.getFormattedTotalPrice();


	res.json({
		message: 'Updated Item!',
		updatedCartData: {
			newTotalQuantity: cart.totalQuantity,
			newTotalPrice: cart.totalPrice,
			updatedItemPrice: updatedItemData.updatedItemPrice,
			formattedTotalPrice: formattedTotalPrice // 전체 물품 총 금액
		}
		
	});
}

function deleteCart(req, res, next) {
	const cart = res.locals.cart;
	cart.removeItem(req.body.productId); // Cart 객체 업데이트(물품 삭제 진행한 후로)

	req.session.cart = cart; // 변경된 장바구니의 내용을 세션에 저장

	const formattedTotalPrice = cart.getFormattedTotalPrice(); // Cart 객체의 totalPrice에 저장된 총 물품 금액을 한국 화폐로 변환

	res.json({
		message: 'Deleted Item!',
		updatedCartData: {
			newTotalQuantity: cart.totalQuantity, // 장바구니 뱃지 업데이트 용
			formattedTotalPrice: formattedTotalPrice, // 전체 물품 총 금액
			isEmpty: cart.totalQuantity === 0
		}
	});
}


module.exports = {
	addToCart: addToCart,
	getCart: getCart,
	updateCart: updateCart,
	deleteCart: deleteCart
};