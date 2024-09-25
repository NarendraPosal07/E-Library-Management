const Book = require('../models/bookModel');

const createBook = async (req, res) => {
    const { title, author, genre } = req.body;
    try {
        const newBook = new Book({ title, author, genre });
        const book = await newBook.save();
        res.json(book);
    } catch (err) {
        res.status(500).send('Server error');
    }
}

const readBook = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).send('Server error');
    }
}

const updateBook = async (req, res) => {
    const { title, author, genre } = req.body;
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ msg: 'Book not found' });

        book.title = title || book.title;
        book.author = author || book.author;
        book.genre = genre || book.genre;

        await book.save();
        res.json(book);
    } catch (err) {
        res.status(500).send('Server error');
    }
}

const deletBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ msg: 'Book not found' });

        await book.remove();
        res.json({ msg: 'Book removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
}

const borrowBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        if (!book.available) return res.status(400).json({ msg: 'Book is already borrowed' });

        book.available = false;
        book.borrowedBy = req.user.id; // Assuming authentication middleware provides user ID
        await book.save();
        res.json(book);
    } catch (err) {
        res.status(500).send('Server error');
    }
}

const returnBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        if (book.available) return res.status(400).json({ msg: 'Book is already returned' });

        book.available = true;
        book.borrowedBy = null;
        await book.save();
        res.json(book);
    } catch (err) {
        res.status(500).send('Server error');
    }
}

module.exports = {
    createBook,
    readBook,
    updateBook,
    deletBook,
    borrowBook,
    returnBook
}