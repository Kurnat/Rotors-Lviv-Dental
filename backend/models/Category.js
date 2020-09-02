const mongoose = require('mongoose');

const CategorusSheme = new mongoose.Schema({
  ua: {
    type: String,
    trim: true,
    maxlength: [50, 'Категорія не може мати більше 50 символів.'],
    minlength: [1, 'Категорія не може мати менше 1 символа']
  },
  en: {
    type: String,
    trim: true,
    maxlength: [50, 'Категорія не може мати більше 50 символів.'],
    minlength: [1, 'Категорія не може мати менше 1 символа']
  }
});

module.exports = mongoose.model('categorus', CategorusSheme);
