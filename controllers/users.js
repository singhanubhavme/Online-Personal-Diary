const User = require('../models/user');
const Diary = require('../models/diary');

module.exports.register = async (req, res) => {
    const {
        fname, username, password, email
    } = req.body;

    let isAdmin = false;
    if (username === 'anubhav' || username === 'admin') {
        isAdmin = true;
    }

    User.find({
        username: username
    }, async (err, docs) => {
        if (docs.length) {
            res.render("message", { msgid: 4 });
        } else {
            const user = new User({
                fname, username, password, email, isAdmin
            })
            await user.save();

            Diary.create({ username: username }, (err, docs) => { });
            req.session.user_id = user._id;
            req.session.fullname = user.fname;
            req.session.username = user.username;
            res.redirect("/");
        }
    })
}

module.exports.login = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    const foundUser = await User.findAndValidate(username, password)
    if (foundUser) {
        req.session.user_id = foundUser._id;
        req.session.fullname = foundUser.fname;
        req.session.username = foundUser.username;
        res.redirect("/");
    } else {
        res.render('message', { msgid: 1 });
    }
}

module.exports.getLogin = (req, res) => {
    res.render('login');
}

module.exports.getRegister = (req, res) => {
    res.render('register');
}

module.exports.home = (req, res) => {
    res.render('home');
}

module.exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
}