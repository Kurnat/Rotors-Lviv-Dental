const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({
  path: './config/config.env'
});

const Products = require('./models/products');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON file
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, 'utf-8')
);

// Import in to DB
const importsData = async () => {
  try {
    await Products.create(products);

    console.log('Data inported...'.green);
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Products.deleteMany();

    console.log('Data destroyet...'.red);
    process.exit();
  } catch (err) {
    console.error(err);
  }
}

if (process.argv[2] === '-i') {
  importsData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
