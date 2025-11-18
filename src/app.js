const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// middleware

app.use(express.json()); //req.body dagi Json malumotlarini avtomatik parse qiladi
app.use(cors()); // boshqa domen/ portlaridan kelgan sorovlarga ruhsat beradi masalan bu bolmasa forntend sorov yubora olmaydi.
app.use(helmet()); // xavfsizlik uchun HTTP headerlarni sozlaydi
app.use(morgan('dev')); // har bir requestni konsolga log qilib boradi

//test api

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'book Api ishlamoqda ',
  });
});

// 3) app'ni tashqariga export qilamiz
module.exports = app;
