const fs = require('fs');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHendler = require('../middleware/async');


/** =================================
 *  @desc   Upload photo
 *  @route  POST /api/v1/photos
 *  @access Private (need authorization)
 *  =================================*/
exports.photoUpload = asyncHendler(async (req, res, next) => {

  console.log(req.files)

  if (!req.files) {
    return next(new ErrorResponse('Будь ласка завантажте зображення.', 400));
  }

  const file = req.files.img;
  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Будь ласка завантажте зображення.', 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Будь ласка завантажте зображення менше ніж ${process.env.MAX_FILE_UPLOAD} байт.`, 400));
  }

  // Create custom filename
  file.name = `photo_${Date.now()}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Виникла проблема з завантаженням зображення`, 500));
    }

    res.status(200).json({
      data: {url: `${req.protocol}://${req.get('host')}/uploads/${file.name}`}
    });
  });

});


/** =================================
 *  @desc   Get photos
 *  @route  GET /api/v1/photos
 *  @access Public (don't need authorization)
 *  =================================*/
exports.getPhotos = asyncHendler(async (req, res, next) => {
  fs.readdir(path.join(__dirname, '../public/uploads'), (err, files) => {
    if (err) {
      next(new ErrorResponse(`Помилка при читанні зображень.`, 500));
    }
    // Set URL for images
    const imagesUrl = files.map(img => {
      const image = {
        url: `${req.protocol}://${req.get('host')}/uploads/${img}`
      }
      return image;
    });

    res.status(200).json({
      data: imagesUrl
    });
  });
});

/** =================================
 *  @desc   Delete photos
 *  @route  DELETE /api/v1/photos/:fileName
 *  @access Private (need authorization)
 *  =================================*/
exports.deletePhoto = asyncHendler(async (req, res, next) => {
  fs.unlink(path.join(__dirname, '../public/uploads', req.params.fileName), (err) => {
    if (err) {
      next(new ErrorResponse(`Сталася помилка при видаленні зображеня.`, 500))
    }

    res.status(200).json({
      message: `Зображення було успішно видалено.`,
      data: {url: `${req.protocol}://${req.get('host')}/uploads/${req.params.fileName}`}
    });
  });
});
