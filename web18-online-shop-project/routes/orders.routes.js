const express = require('express');

const ordersController = require('../controllers/orders.controller');

const router = express.Router();


router.get('/', ordersController.getOrder);

router.post('/', ordersController.addOrder); // path: /orders/ 

router.post('/cancel/:id', ordersController.cancelOrder);

router.post('/validate', ordersController.validateOrder);

module.exports = router;