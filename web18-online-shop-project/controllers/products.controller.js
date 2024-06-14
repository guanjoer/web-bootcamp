const Product = require('../models/product.model');

async function getAllProducts(req, res, next) {
	try {
		// DB내의 키-값 쌍이, Product 클래스의 파라미터로 들어가, 각각의 객체 정보 생성
		const products = await Product.findAll();
		products.forEach(product => {
			product.formattedPrice = product.formatPrice();
		});
		// console.log(products);
		res.render('customer/products/all-products', {products: products});
	} catch (error) {
		error.code = 500;
		next(error);		
	};
};

async function getProductDetails(req, res, next) {
	try {
		let product = await Product.findById(req.params.id);
		// 한국 화폐로 표시
		product.formattedPrice = product.formatPrice();
		res.render('customer/products/product-details', {product: product});
	} catch (error) {
		error.code = 404;
		next(error);
	};
	// console.log(product);
}



module.exports = {
	getAllProducts: getAllProducts,
	getProductDetails: getProductDetails
};