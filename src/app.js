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

// Temporary "database" (memory-based)
let books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear' },
  { id: 2, title: 'Clean Code', author: 'Robert Martin' },
];

//test api

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'book Api ishlamoqda ',
  });
});

// get all api

app.get('/api/books', (req, res) => {
  res.json({
    succes: true,
    data: books,
  });
});

// id boyicha bitta kitobni olish

app.get('/api/books/:id', (req, res) => {
  let bookId = Number(req.params.id);

  let book = books.find((b) => b.id === bookId);

  if (book) {
    res.json({
      book: book,
      success: true,
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Bunday kitob topilmadi',
    });
  }
});

// 3) app'ni tashqariga export qilamiz
module.exports = app;
