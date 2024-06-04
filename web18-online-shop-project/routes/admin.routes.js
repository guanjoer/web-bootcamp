const express = require('express');

const adminController = require('../controllers/admin.controller');

const router = express.Router();


router.get('/products', adminController.getProducts); // path: /admin/products

router.get('/products/new', adminController.getNewProduct);

router.get('/orders', );


module.exports = router;