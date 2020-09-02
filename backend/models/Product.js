const mongoose = require('mongoose');

const ProductSheme = new mongoose.Schema({
  producer: {
    type: String,
    trim: true,
    maxlength: [50, 'Виробник не може мати більше 50 символів.']
  },
  model: {
    type: String,
    trim: true,
    maxlength: [50, 'Модель не може мати більше 50 символів.']
  },
  img: {
    type: String
    // default: 'no-photo.jpg'
  },
  material: {
    type: String,
    trim: true,
    maxlength: [50, 'Матеріал не може мати більше 50 символів.']
  },
  price: {
    type: Number,
    required: [true, 'Поле "Ціна" є обов`язковим.'],
    min: [1, 'Ціна повина мати як мінімум 1 символ.'],
    max: [999999999999, 'Ціна може мати максимум 10 символів.']
  },
  size: String,
  date: {
    type: Date,
    default: Date.now
  },
  categories: {
    type: String,
    required: [true, 'Поле "Категорії" є обов`язковим.'],
    maxlength: [64, 'Категорія не може мати більше 64 символів.']
  },
  categoryUA: {
    type: String,
    required: [true, 'Поле "Категорії" є обов`язковим.'],
    maxlength: [64, 'Категорія не може мати більше 64 символів.']
  },
  ourSeriusNumber: {
    type: String,
    required: [true, 'Поле "Наш Серійний Номер" є обов`язковим.'],
    unique: [true, 'Такий "Наш Серійний Номер" уже існує. Спробуйте інший'],
    maxlength: [32, '"Наш серійний номер" не може мати більше 32 символів.']
  },
  seriusNumber: {
    type: String,
    required: [true, 'Поле "Серійний Номер" є обов`язковим.'],
    unique: [true, 'Такий "Серійний Номер" уже існує. Спробуйте інший'],
    maxlength: [20, '"Cерійний Номер" не може мати більше 20 символів.']
  },
  count: {
    type: Number,
    required: [true, `Кількість є обов'язковою`]
  }
});

ProductSheme.pre('save', function(next) {
  this.date = new Date(this.date);
  next();
});

module.exports = mongoose.model('Product', ProductSheme);
