const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = Object.assign({}, err);

  // log to console
  console.log( err.code,`Message is: ${err.message}`.red, `Name error is: ${err.name}`, `Error object is:`, err, `In:  ${__filename}`.yellow);

  // Mongoose bad ObjectId
  if (error.name === 'CastError') {
    // const message = `Ресурс з ID ${req.params.id} не знайдений`;
    error = new ErrorResponse(`Ресурс з ID: ${err.value} не знайдений`, 404);
  }

  if(err.code === 11000) {
    const message = `Ресурс з таким  номером зарезервований`
    error = new ErrorResponse(message, 404);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError'){
    const message = Object.values(err.errors).map(val => val.message)
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode).json({
    success: false,
    error: error.message || 'Server Error'
  });
}

module.exports = errorHandler;
