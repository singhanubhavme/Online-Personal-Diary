const express = require('express');
const router = express.Router();
const diary = require('../controllers/diary');

const middleware = require('../middleware');

router.post('/createDailyDiary', middleware.isLoggedIn, diary.createDailyDiary);

router.get('/deleteDailyDiary/:entryUID', middleware.isLoggedIn, diary.deleteDailyDiary);

router.get('/create', middleware.isLoggedIn, diary.create);

router.get('/my-diary', middleware.isLoggedIn, diary.getMyDiary);

module.exports = router;