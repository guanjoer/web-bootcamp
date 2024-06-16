const axios = require('axios');

const Product = require('../models/product.model');
const Order = require('../models/orders.model');
const User = require('../models/user.model');
const Cart = require('../models/cart.model');


async function addOrder(req, res, next) {
	const { imp_uid, merchant_uid } = req.body;
	const cart = res.locals.cart; // 세션에 저장된 카트(req.session.cart)정보를 기반으로 Cart 클래스를 거쳐 생성된 Cart 객체의 정보

	let userDocument;
	try {
		userDocument = await User.findById(res.locals.uid); // 로그인 시 세션에 저장된 uid 값을 매개변수로 넣어, 일치하는 user의 값 반환 // 패스워드 제외
	} catch (error) {
		error.code = 404;
		return next(error); // Go to error handling middleware
	}

	    // 2. 포트원 인증 토큰 발급
		let getToken;
		try {
			getToken = await axios({
				url: "https://api.iamport.kr/users/getToken",
				method: "POST", // POST method
				headers: { "Content-Type": "application/json" },
				data: {
					imp_key: "0401840441043566", // REST API 키
					imp_secret: "CZNCO8yFB4ckWrgNQeLqANJc4sdB9sxfiS2lxSsiOmkJfOxmIxxU3Lqj4xWAxQxODa5HYV1KpG3LmBB5" // REST API Secret
				}
			});
		} catch (error) {
			error.code = 500;
			return next(error);
		}

		const { access_token } = getToken.data.response; // 인증 토큰

		// 3. imp_uid로 아임포트 서버에서 결제 정보 조회
		let getPaymentData;
		try {
			getPaymentData = await axios({
				url: `https://api.iamport.kr/payments/${imp_uid}`,
				method: "get", // GET method
				headers: { "Authorization": access_token } // 인증 토큰 Authorization header에 추가
			});
		} catch (error) {
			error.code = 500;
			return next(error);
		}
	
		const paymentData = getPaymentData.data.response; // 조회한 결제 정보

		// 4. 결제 금액 검증
		const amountToBePaid = cart.totalPrice; // 서버 측에서 계산한 장바구니 총 금액
		if (paymentData.amount !== amountToBePaid) {
			return res.status(400).json({ success: false, message: "결제 금액 불일치" });
		}
	
		// 5. 결제 상태 확인
		if (paymentData.status !== "paid") {
			return res.status(400).json({ success: false, message: "결제가 완료되지 않았습니다." });
		}
		
		 // 6. 결제 검증 완료 후 주문 저장
	const order = new Order(cart, userDocument);

	try {
		await order.save()
	} catch (error) {
		error.code = 500;
		next(error);
		return;
	};

	// console.log(res.locals.cart); // 장바구니 물품 정보
	// console.log(userDocument); // 로그인 한 유저 정보
	// console.log(order); // 위의 정보들이 들어있는 객체(유저, 제품, status, date, formatteddate, orderId)

	req.session.cart = null;

	res.status(201).json({ success: true });
	// res.redirect('/orders');
};

async function getOrder(req, res, next) {
	try {
		const orders = await Order.findAllForUser(res.locals.uid); // res.locals.uid = 로그인 한 유저의 고유 아이디
		
		const formattedOrders = orders.map(order => {
			const cart = new Cart(order.productData.items, order.productData.totalQuantity, order.productData.totalPrice);
			return {
				...order,
				formattedItems: cart.getFormattedItems(),
				formattedTotalPrice: cart.getFormattedTotalPrice()
			};
		});

		// console.log(formattedOrders);
		res.render('customer/orders/all-orders', {
		  orders: formattedOrders
		});
	  } catch (error) {
		next(error);
	  }

};

// 주문 취소; order.status = "pending" 일때만
async function cancelOrder(req, res, next) {
	const orderId = req.params.id;
	try {
		const order = await Order.findById(orderId);

		if (order.userData._id.toString() !== res.locals.uid || order.status !== 'pending') {
			return res.redirect('/orders');
		};

		order.status = 'cancelled';
		await order.save(); // DB 업데이트

		res.redirect('/orders');
	} catch (error) {
		next(error);
	}
}


module.exports = {
	addOrder: addOrder,
	getOrder: getOrder,
	cancelOrder: cancelOrder
};