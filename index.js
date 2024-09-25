const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db/db');
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');

dotenv.config();
const app = express();
app.use(express.json());
connectDB;

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`
    ));
