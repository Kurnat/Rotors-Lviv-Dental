const ErrorResponse = require('../utils/errorResponse');
const asyncHendler = require('../middleware/async');
const Category = require('../models/Category');
const ObjectId = require('mongodb').ObjectID;

/** =================================
 *  @desc   Get all Categories
 *  @route  GET /api/v1/categories
 *  @access Public (don't need authorization)
 *  =================================*/
exports.getAllCategories = asyncHendler(async (req, res, next) => {
  const categories = await Category.find().lean();

    res.status(200).json({
      success: true,
      data: categories
    });
});

/** =================================
 *  @desc   Create new category
 *  @route  POST /api/v1/categories
 *  @access Private (need authorization)
 *  =================================*/
exports.createNewCategory = asyncHendler(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    data: category,
  });
});

/** =================================
 *  @desc   Update category
 *  @route  PUT /api/v1/categories/:id
 *  @access Private (need authorization)
 *  =================================*/
exports.updateCategory = asyncHendler(async (req, res, next) => {
  const id = ObjectId(req.params.id)
  const category = await Category.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!category) {
    next(new ErrorResponse(`Категорія з ID "${req.params.id}" не знайдено!`, 404))
  }

  res.status(200).json({
    success: true,
    data: category
  });
});

/** =================================
 *  @desc   Delete category
 *  @route  DELETE /api/v1/categories/:id
 *  @access Private (need authorization)
 *  =================================*/
exports.deleteCategory = asyncHendler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    next(new ErrorResponse(`Категорія з ID "${req.params.id}" не знайдено!`, 404))
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});
