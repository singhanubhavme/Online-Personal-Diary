const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

router.post('/register', users.register);

router.post('/login', users.login);

router.post('/logout', users.logout);

router.get('/register', users.getRegister);

router.get('/login', users.getLogin);

router.get('/', users.home);

module.exports = router;
        