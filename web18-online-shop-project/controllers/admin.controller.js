const Product = require('../models/product.model');
const Order = require('../models/orders.model');
const Cart = require('../models/cart.model');


// 물품 목록 가져오기
async function getProducts(req, res, next) {
	try {
		const products = await Product.findAll();
		products.forEach(product => {
			product.formattedPrice = product.formatPrice();
		});
		// console.log(products);
		res.render('admin/products/all-products', {products: products});
	} catch (error) {
		error.code = 500;
		next(error)
		return;
	}
};

// 새로운 물품 추가할 페이지 가져오기
function getNewProduct(req, res) {
	const product = {
		title: '',
		summary: '',
		price: null,
		description: ''
	};
	res.render('admin/products/new-product', {product: product})
};

// 작성한 새로운 물품 추가하기
async function createNewProduct(req, res, next) {
	// console.log(req.body);
	// console.log(req.file);

	const product = new Product({
		...req.body,
		image: req.file.filename
	});

	try {
		await product.save();
	} catch (error) {
		error.code = 500;
		next(error);
		return;
	}

	res.redirect('/admin/products')
};

// 관리자 물품 업데이트 페이지 가져오기
async function getUpdateProduct(req, res, next) {
	try {
		const product = await Product.findById(req.params.id);
		// console.log(product);
		res.render('admin/products/update-product', {product: product})
	} catch (error) {
		error.code = 404;
		next(error);
	}
}

// 물품 업데이트 진행하기
async function updateProduct(req, res, next) {
	const product = new Product({
		...req.body,
		_id: req.params.id
	})
	// console.log(product);

	if(req.file) {
		product.replaceImage(req.file.filename);
	}

	try {
		await product.save();
	} catch (error) {
		error.code = 500;
		next(error)
		return;		
	}

	res.redirect('/admin/products')
}

// 물품 삭제 진행하기
async function deleteProduct(req, res, next) {
	let product;
	try {
		product = await Product.findById(req.params.id);
		await product.remove();
	} catch (error) {
		error.code = 404;
		next(error);		
	};

	// Ajax는 데이터 교환이 일어나야 하기 때문에, res.json()을 통해, front-end로 응답을 보내주도록 하자.
	res.json({message: 'Deleted Product!'});
}

// Manage Orders 페이지 가져오기
async function getOrders(req, res, next) {
	try {
	  const orders = await Order.findAll(); // 유저에 상관없이 orders 컬렉션의 모든 문서들을 인스턴스화

	  const formattedOrders = orders.map(order => {
		const cart = new Cart(order.productData.items, order.productData.totalQuantity, order.productData.totalPrice);
		return {
			...order,
			formattedItems: cart.getFormattedItems(),
			formattedTotalPrice: cart.getFormattedTotalPrice()
		};
	});
	//   console.log(orders);
	  res.render('admin/orders/admin-orders', { 
		orders: formattedOrders
	  });
	} catch (error) {
	  next(error);
	}
  }

  async function updateOrder(req, res, next) {
	const orderId = req.params.id;
	const newStatus = req.body.newStatus;
	// console.log(orderId);
	try {
	  const order = await Order.findById(orderId);
  
	  order.status = newStatus;
  
	  await order.save(); // DB의 orders 내용을 최신화. 즉 변경된 인스턴스의 정보를 DB에 저장
  
	  res.json({ message: 'Order updated', newStatus: newStatus });
	} catch (error) {
	  next(error);
	}
  };


module.exports = {
	getProducts: getProducts,
	getNewProduct: getNewProduct,
	createNewProduct, createNewProduct,
	getUpdateProduct: getUpdateProduct,
	updateProduct: updateProduct,
	deleteProduct: deleteProduct,
	getOrders: getOrders,
	updateOrder: updateOrder
};