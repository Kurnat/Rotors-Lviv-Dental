const path = require('path');
const express = require('express');
const colors = require('colors');
const fileupload = require('express-fileupload')
// Lead env vars
require('dotenv').config({
  path: './config/config.env'
});
// DB conention
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error'); // Error Handler
const products = require('./routes/products'); // Route file
const photos = require('./routes/photos');
const categories = require('./routes/categories');
const orders = require('./routes/orders');

const app = express();



// Middleware
app.use(require('morgan')('dev'));
app.use(require('cors')());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload());

// Dev login middleware
if (process.env.NODE_ENV === 'development') {
  app.use(require('morgan')('dev'));
}

// Routes
app.use('/api/v1/products', products);
app.use('/api/v1/photos', photos);
app.use('/api/v1/categories', categories);
app.use('/api/v1/orders', orders);




app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  await connectDB(); // Run Server
  console.log(`Server was running in ${process.env.NODE_ENV} mode on port: ${PORT}`.yellow)
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
  // Close server & exit process
  server.close(() => process.exit(1));
});





