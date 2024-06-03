const express = require('express');

// const productsController = require('../controllers/products.controller');

const router = express.Router();


router.get('/', function(req, res) {
	res.redirect('/products');
});


module.exports = router;