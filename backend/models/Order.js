const mongoose = require('mongoose');

const OrderShema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, `Ім'я є обовязковим. `],
    maxlength: [40, `Ім'я не може мати більше ніж 40 символів. `]
  },
  email: {
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Будь ласка вкажіть коректний email. '
    ]
  },
  phone: {
    type: String,
    required: [true, 'Номер телефону є обовязковим. '],
    minlength: [12, 'Номер телефону не коректний. '],
    maxlength: [16, 'Номере телефону не може бути більшим ніж 16 символів. ']
  },
  products: [{count: Number, product: {type: mongoose.Schema.ObjectId, ref: 'Product' , required: [true, 'Вказаний продукт у замовленні не коректний. ']}}],
  orderNumber: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('orders', OrderShema);
