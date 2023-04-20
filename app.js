const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('cookie-session');
const dotenv = require('dotenv').config();
const path = require('path');

const userRoutes = require('./routes/users');
const dairyRoutes = require('./routes/diary');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// database
const dbURL =
  process.env.DB_URL || 'mongodb://localhost:27017/online-personal-diary';
mongoose
  .connect(dbURL)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('Cannot connect to DB ', err));

// session config
const sessionConfig = session({
  secret: process.env.SECRET || 'very complex secret',
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  saveUninitialized: true,
  resave: true,
});
app.use(sessionConfig);

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user_id;
  res.locals.fullname = req.session.fullname;
  next();
});

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// routes
app.use('/', userRoutes);
app.use('/', dairyRoutes);

// connect express
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serving on Port ${port}`));
