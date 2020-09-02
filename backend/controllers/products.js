const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHendler = require('../middleware/async');
const Product = require('../models/Product');
// const upload = require('../config/db').upload;

/** =================================
 *  @desc   Get all products
 *  @route  GET /api/v1/products?sort=name,description&sort=-name,date
 *  @access Public (don't need authorization)
 *  =================================*/
exports.getProducts = asyncHendler(async (req, res, next) => {
  let query;

  const reqQuery = {...req.query}

  // Filds to exclude
  const removeFilds = ['select', 'sort'];

  // Loop over removeFilds and delete them from reqQuery
  removeFilds.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, ect)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${matsch}`);

  // Find resource
  query = Product.find(JSON.parse(queryStr));

   // Select Filds
   if (req.query.select) {
    const fields = req.query.select.split(',').json(' ');
    query = query.select(fields);
   }

  //  Sort Fields
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-date');
  }

  // Execution query
  const products = await query;

  res.status(200).json({
    success: true,
    data: products
  });
});

/** =================================
 *  @desc   Get single product
 *  @route  GET /api/v1/products/:id
 *  @access Public (don't need authorization)
 *  =================================*/
exports.getProduct = asyncHendler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorResponse(`Продукт з ID ${req.params.id} не знайдено`, 404));
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

/** =================================
 *  @desc   Create new product
 *  @route  POST /api/v1/products/
 *  @access Private (need authorization)
 *  =================================*/
exports.createProduct = asyncHendler(async (req, res, next) => {
  req.body.date = new Date(req.body.date);
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product,
  });
});

/** =================================
 *  @desc   Update product
 *  @route  PUT /api/v1/products/:id
 *  @access Private (need authorization)
 *  =================================*/
exports.updateProduct = asyncHendler(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return next(new ErrorResponse(`Продукт з ID ${req.params.id} не знайдено`, 404));
    }

    res.status(200).json({
      success: true,
      data: product
    });
});

/** =================================
 *  @desc   Delete product
 *  @route  DELETE /api/v1/products/:id
 *  @access Private (need authorization)
 *  =================================*/
exports.deleteProduct = asyncHendler(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new ErrorResponse(`Продукт з ID ${req.params.id} не знайдено`, 404));
    }

    res.status(200).json({
      success: true,
      data: product
    });
});


/** =================================
 *  @desc   Upload photo for product
 *  @route  PUT /api/v1/products/:id/photo
 *  @access Private (need authorization)
 *  =================================*/
exports.productPhotoUpload = asyncHendler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if(!product) {
    return next(new ErrorResponse(`Продукт з ID ${req.params.id} не знайденою`, 404));
  }

  if(!req.files){
    return next(new ErrorResponse('Будь ласка завантажте зображення.', 400));
  }

  const file = req.files.img;
  // Make sure the image is a photo
  if(!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Будь ласка завантажте зображення.', 400));
  }

  // Check filesize
  if(file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Будь ласка завантажте зображення менше ніж ${process.env.MAX_FILE_UPLOAD} байт.`, 400));
  }

  // Create custom filename
  file.name = `photo_${product._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Виникла проблема з завантаженням зображення`, 500));
    }

    await Product.findOneAndUpdate(req.params.id, {img: file.name});

    res.status(200).json({data: file.name});
  })

});





