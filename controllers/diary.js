const ShortUniqueId = require("short-unique-id");
const QuillDeltaToHtmlConverter = require('quill-delta-to-html').QuillDeltaToHtmlConverter;
const Diary = require('../models/diary');
const User = require('../models/user');

function getTimestamp() {
    const current = new Date();
    return new Date(Date.UTC(current.getFullYear(),
        current.getMonth(), current.getDate(), current.getHours(),
        current.getMinutes(), current.getSeconds(), current.getMilliseconds()));
}

module.exports.createDailyDiary = (req, res) => {
    const shortid = new ShortUniqueId({ length: 10 });
    let uuid = shortid();
    const uid = req.session.user_id;
    User.findOne({ _id: uid }, (err, docs) => {
        if (!err && docs) {
            const username = docs.username;
            const { content, title } = req.body;
            const timestamp = getTimestamp();
            const doc = new Diary({
                username: username,
                entryUID: uuid,
                content: content,
                title: title,
                timestamp: timestamp
            });
            doc.save()
                .then(() => res.redirect('/my-diary'))
                .catch((err) => res.status(404).send(err))
        } else {
            res.render("message", { msgid: 3 });
        }
    })
}

module.exports.deleteDailyDiary = (req, res) => {
    const username = req.session.username;
    const { entryUID } = req.params;

    Diary.findOneAndDelete({ username, entryUID }, (err, docs) => {
        if (docs) {
            res.render("message", { msgid: 5 });
        } else {
            res.render("message", { msgid: 3 });
        }
    })
}

module.exports.create = (req, res) => res.render('create');

module.exports.getMyDiary = (req, res) => {
    const username = req.session.username;
    Diary.find({ username: username }, (err, docs) => {
        if (!err && docs.length) {
            const htmlArr = [];
            for (let i = 0; i < docs.length; i++) {
                const deltaOps = JSON.parse(docs[i].content).ops;
                const converter = new QuillDeltaToHtmlConverter(deltaOps, {});
                const html = converter.convert();
                htmlArr.push(html);
            }
            if (htmlArr.length >= 1)
                res.render('my-diary', { docs: docs, htmlArr: htmlArr });
        } else {
            res.render("message", { msgid: 6 });
        }
    })
};