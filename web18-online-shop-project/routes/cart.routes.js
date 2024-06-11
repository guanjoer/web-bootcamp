const express = require('express');

const cartController = require('../controllers/cart.controller');

const router = express.Router();



router.get('/', cartController.getCart); // path: /cart/

router.post('/items', cartController.addToCart); // path: /cart/items

router.patch('/items', cartController.updateCart);

module.exports = router;