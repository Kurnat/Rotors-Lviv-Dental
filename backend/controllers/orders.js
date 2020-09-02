"use strict";
const ErrorResponse = require('../utils/errorResponse');
const asyncHendler = require('../middleware/async');
const Orders = require('../models/Order');
const asyncHandler = require('../middleware/async');
const mesenger = require('../utils/nodemailer');
const Order = require('../models/Order');

/** =================================
 *  @desc   Get all Orders
 *  @route  GET /api/v1/orders
 *  @access Public (don't need authorization)
 *  =================================*/
exports.getOrders = asyncHendler(async (req, res, next) => {
  let orders = await Orders.find().populate({path: 'products.product', model: 'Product'});

  res.status(200).json({
    success: true,
    orders
  });
});

/** =================================
 *  @desc   Creape Order
 *  @route  POST /api/v1/orders
 *  @access Private (need authorization)
 *  =================================*/
exports.createOrder = asyncHandler(async (req, res, next) => {
  const lastOrder = await Orders.findOne({}).sort({date: -1});

  const maxOrder = lastOrder ? lastOrder.orderNumber : 0;

  const newOrder = {...req.body, orderNumber: maxOrder + 1};

  const order = await Orders.create(newOrder);
  // Send mesage about order on Email
  if(order) {
    mesenger(order);
  } else {
    next(new ErrorResponse('Сталася помилка при створенні замовлення. Будь ласка спробуйте ще.', 400))
  }

  res.status(201).json({
    success: true,
    order
  });
})

/** =================================
 *  @desc   Delete Order
 *  @route  DELETE /api/v1/orders/:id
 *  @access Private (need authorization)
 *  =================================*/
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  const order = await Orders.deleteOne({
    _id: req.params.id
  });

  res.status(200).json({
    success: true,
  });
})

/** =================================
 *  @desc   Update Order
 *  @route  PUT /api/v1/orders/:id
 *  @access Private (need authorization)
 *  =================================*/
exports.updateOrder = asyncHandler(async (req, res, next) => {
  console.log(req.params.id);
  console.log(req.body);
  const order = await Orders.findByIdAndUpdate(req.params.id, { $pull: { "products": { _id: req.body.products._id } } }, {
    new: true,
    safe: true,
    upsert: true,
    runValidators: true,
  }).populate('products');

  res.status(200).json({
    success: true,
    data: order
  });
})
