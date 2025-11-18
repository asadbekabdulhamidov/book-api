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

// post  books yani yangi kitob qoshadi
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !title.trim() || !author || !author.trim()) {
    res.status(400).json({
      success: false,
      message: 'Title va author majburiy',
    });
  }

  let newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author,
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    message: 'Muvaffaqiyatli qoshildi',
    data: newBook,
  });
});

// 3) app'ni tashqariga export qilamiz
module.exports = app;
