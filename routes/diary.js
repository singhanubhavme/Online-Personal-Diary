const express = require('express');
const router = express.Router();
const diary = require('../controllers/diary');

const middleware = require('../middleware');

router.post('/createDailyDiary',middleware.isLoggedIn, diary.createDailyDiary);

router.post('/updateDailyDiary',middleware.isLoggedIn, diary.updateDailyDiary);

router.post('/deleteDailyDiary',middleware.isLoggedIn, diary.deleteDailyDiary);

router.get('/create', middleware.isLoggedIn, diary.create);

router.get('/update', middleware.isLoggedIn, diary.update);


module.exports = router;