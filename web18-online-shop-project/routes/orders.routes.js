const express = require('express');

const ordersController = require('../controllers/orders.controller');

const router = express.Router();


router.get('/', ordersController.getOrder);

router.post('/', ordersController.addOrder); // path: /orders/ 



module.exports = router;