const Diary = require('../models/diary');
const User = require('../models/user');

// get current timestamp
function getTimestamp() {
    const current = new Date();
    return new Date(Date.UTC(current.getFullYear(),
        current.getMonth(), current.getDate(), current.getHours(),
        current.getMinutes(), current.getSeconds(), current.getMilliseconds()));
}

module.exports.createDailyDiary = (req, res) => {
    const { username, content, headerImageURL } = req.body;
    const timestamp = getTimestamp();
    const doc = new Diary({ 
        username: username, 
        content: content, 
        headerImageURL: headerImageURL, 
        timestamp: timestamp 
    });
    doc.save()
        .then(() => res.status(201).send('Document Created'))
        .catch((err) => res.status(404).send('Cannot Create Document ', err))
}

module.exports.updateDailyDiary = (req, res) => {
    const { username, timestamp, content, headerImageURL } = req.body;
    Diary.findOneAndUpdate({ username: username, timestamp: timestamp },
        {
            content: content,
            headerImageURL: headerImageURL
        },
        (err, docs) => {
            if (docs) {
                res.status(200).send('Diary Updated');
            } else {
                res.status(417).send('Cannot Update Diary');
            }
        })
}

module.exports.deleteDailyDiary = (req, res) => {
    const { username, timestamp } = req.body;

    Diary.findOneAndDelete({ username, timestamp }, (err, docs) => {
        if (docs) {
            res.status(200).send('Document Deleted');
        } else {
            res.status(400).send('Cannot delete Document');
        }
    })
}

module.exports.create = (req, res) => {
    res.render('create');
}

module.exports.update = (req, res) => {
    res.render('update');
}