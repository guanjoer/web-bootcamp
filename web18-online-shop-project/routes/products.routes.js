const express = require('express');

// const productsController = require('../controllers/products.controller');

const router = express.Router();


router.get('/products', function(req, res) {
	res.render('customer/products/all-products');
});


module.exports = router;