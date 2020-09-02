const express = require('express');
const route = express.Router();
const {
  getAllCategories,
  createNewCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categories');

route
  .route('/')
  .get(getAllCategories)
  .post(createNewCategory);

route
  .route('/:id')
  .put(updateCategory)
  .delete(deleteCategory)


module.exports = route;
