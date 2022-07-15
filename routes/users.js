const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router
    .get('/register', users.getRegister)
    .post('/register', users.register);

router
    .get('/login', users.getLogin)
    .post('/login', users.login);

router
    .post('/logout', users.logout)
    .get('/logout', users.logout);

router
    .get('/message');

router
    .get('/', users.home);

module.exports = router;