const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv').config();

const userRoutes = require('./routes/users');
const dairyRoutes = require('./routes/diary');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// database
const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/online-personal-diary';
mongoose.connect(dbURL)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log('Cannot connect to DB ', err))

// session config
const sessionConfig = session({
    secret: process.env.SECRET || 'very complex secret',
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
    saveUninitialized: true,
    resave: true
});
app.use(sessionConfig);
app.set('view engine', 'ejs');
app.set('views', 'views');

// routes

app.use('/', userRoutes);
app.use('/', dairyRoutes);


// connect express
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serving on Port ${port}`));