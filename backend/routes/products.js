const express = require('express');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productPhotoUpload
} = require('../controllers/products');

const router = express.Router();

router
    .route('/:id/photo')
    .put(productPhotoUpload);

router
    .route('/')
    .get(getProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct);



module.exports = router;
