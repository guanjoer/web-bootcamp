const Product = require('../models/product.model');


// 물품 목록 가져오기
function getProducts(req, res) {
	res.render('admin/products/all-products');
};

// 새로운 물품 추가할 페이지 가져오기
function getNewProduct(req, res) {
	res.render('admin/products/new-product')
};

// 작성한 새로운 물품 추가
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
		next(error);
		return;
	}

	res.redirect('/admin/products')
};


module.exports = {
	getProducts: getProducts,
	getNewProduct: getNewProduct,
	createNewProduct, createNewProduct
};