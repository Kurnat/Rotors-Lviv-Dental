"use strict";
const nodemailer = require("nodemailer");

const mesenger = async (order) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'beda21beda21@gmail.com', // generated ethereal user
      pass: '0638393470v'
    }
  });

  console.log(order);

  let DD = new Date(order.date).getDay();
  let MM = new Date(order.date).getMonth();
  let YYYY = new Date(order.date).getFullYear();
  let hh = new Date(order.date).getHours();
  let mm = new Date(order.date).getMinutes();
  let ss = new Date(order.date).getSeconds();

  DD = addZero(DD);
  MM = addZero(MM);
  hh = addZero(hh);
  mm = addZero(mm);
  ss = addZero(ss);

  let html = `
  <div style="max-width: 500px; margin: 0 auto;overflow: hidden;">
    <div style="padding:.9rem .9rem 0;overflow: hidden;background-color:#333;color: #f1f1f1;font-size: 15px">
      <p>Замовлення № <strong>${order._id}</strong></p>
      <p>Час замовлення: <strong>${hh}:${mm}:${ss} ${DD}/${MM}/${YYYY}</strong></p>
      <p>Ім'я клієнта: <strong>${order.userName}</strong></p>
      <p>Телефон: <a href="tel:${order.phone}" style="color: #ffb300" rel="noreferrer noopener">${order.phone}</a></p>
      <p>Поштова скринька: ${order.email ? '<a href="mailto:'+ order.email +'" target="_self" style="color: #ffb300" rel="noreferrer noopener">'+ order.email +'</a>' : 'не вказана.'}</p>
      <p>Замовлення на суму:  <strong>${order.products.reduce((acc, product) => (acc += product.count * product.price),0)} &#8364;</strong> </p>
      <br>
      <p style="font-size: 16px; margin-bottom: .5rem"><strong>Список Замовлень:</strong></p>
   </div>
  `;

  order.products.forEach((item, idx) => {
    if(idx === 0){
      html += '<div style="background-color:#f1f1f1;list-style: none;padding: .4rem;">';
    }
    html += `
      <div style="padding:.5rem; border-bottom: 1px dotted #ccc">
        <p style="font-size: 14px">Продукт: <strong>#${idx + 1}</strong></p>
        <p style="font-size: 14px">Категорія: <strong>${item.categoryUA ? item.categoryUA : 'не вказано'}</strong></p>
        <p style="font-size: 14px">Виробник: <strong>${item.producer ? item.producer : 'не вказано'}</strong></p>
        <p style="font-size: 14px">Модель: <strong>${item.model ? item.model : 'не вказано'}</strong></p>
        <p style="font-size: 14px">Розмір: <strong>${item.size ? item.size : 'не вказано'}</strong></p>
        <p style="font-size: 14px">Кількіть: x<strong>${item.count ? item.count : 'не вказано'} шт.</strong></p>
        <p style="font-size: 14px">Ціна: <strong>${item.price ? item.price : 'не вказано'}</strong> &#8364;</p>
        <p style="font-size: 14px">Наш серійний номер: <strong>${item.ourSeriusNumber ? item.ourSeriusNumber : 'не вказано'}</strong></p>
        <p style="font-size: 14px">Серійний номер виробника: <strong>${item.seriusNumber ? item.seriusNumber : 'не вказано'}</strong></p>
      </div>
    `
    if(idx === order.products.length - 1){
      html += '</div></div>';
    }
  })

  const mailOptions = {
    from: 'beda21beda21@gmail.com',
    to: 'beda21@ukr.net',
    subject: 'Замовлення для "LVIV ROTORS" ',
    html
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function addZero(x){
  if (x < 9) {
    return '0' + x;
  } else {
    return x;
  }
}

module.exports = mesenger;
