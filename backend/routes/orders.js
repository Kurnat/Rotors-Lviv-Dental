const express = require('express');
const router = express.Router();

const {getOrders, createOrder, deleteOrder, updateOrder} = require('../controllers/orders');


router.route('/')
    .get(getOrders)
    .post(createOrder)

router.route('/:id')
    .delete(deleteOrder)
    .put(updateOrder)



module.exports = router;
