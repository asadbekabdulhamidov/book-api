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

// put
app.put('/api/books/:id', (req, res) => {
  let bookId = Number(req.params.id);
  let { title, author } = req.body;
  const putBook = books.find((item) => item.id === bookId);

  if (!putBook)
    return res.status(404).json({
      success: false,
      message: `Bu ${bookId} bo'yicha kitob topilmadi shunga ozgartirib bolmaydi`,
    });

  if (title && title.trim()) {
    putBook.title = title.trim();
  }

  if (author && author.trim()) {
    putBook.author = author.trim();
  }

  res.json({
    success: true,
    data: putBook,
  });
});

// delete
app.delete('/api/books/:id', (req, res) => {
  let bookId = Number(req.params.id);

  const indexDelete = books.findIndex((item) => item.id === bookId);
  if (indexDelete === -1)
    return res.status(404).json({
      message: 'Book topilmadi',
      success: false,
      status: 404,
    });
  // ochirishdan oldin saqlab olamz
  let deleteBook = books[indexDelete];
  // booksdan bitta bookni ochirish
  books.splice(indexDelete, 1);

  res.json({
    succes: true,
    message: 'Muvaffaqiyali ochirildi',
    deleteBook,
  });
});

// 3) app'ni tashqariga export qilamiz
module.exports = app;
