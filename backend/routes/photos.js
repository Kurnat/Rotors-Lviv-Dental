// /api/v1/photos
const express = require('express');
const {photoUpload, getPhotos, deletePhoto} = require('../controllers/photos');

const router = express.Router();

router
    .route('/')
    .get(getPhotos)
    .post(photoUpload);

router
    .route('/:fileName')
    .delete(deletePhoto);

module.exports = router;
