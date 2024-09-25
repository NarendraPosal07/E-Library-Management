const express = require('express');
const router = express.Router();
const books = require('../controllers/bookController')

router.post('/', books.createBook);

router.get('/', books.readBook);

router.put('/:id', books.updateBook);

router.delete('/:id', books.deletBook);

router.post('/:id/borrow', books.borrowBook);

router.post('/:id/return', books.returnBook);

module.exports = router