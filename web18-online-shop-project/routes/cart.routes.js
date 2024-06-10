const express = require('express');

const cartController = require('../controllers/cart.controller');

const router = express.Router();


router.post('/items', cartController.addToCart); // path: /cart/items

router.get('/', cartController.getCart); // path: /cart/


module.exports = router;