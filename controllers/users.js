const User = require('../models/user');
const Diary = require('../models/diary');

module.exports.register = async (req, res) => {
    const {
        name, username, password, email
    } = req.body;

    // setting isAdmin to false, due to sync issues
    let isAdmin = false;
    if (username === 'anubhav' || username === 'admin') {
        isAdmin = true;
    } else {
        isAdmin = false;
    }

    // find user
    User.find({
        username: username
    }, async (err, docs) => {
        // if username found in database, that means user is already registered
        if (docs.length) {
            res.status(400).send('User Already Registered');
        } else {
            // create new user
            const user = new User({
                name, username, password, email, isAdmin
            })
            await user.save();

            // initiate diary document
            Diary.create({
                username: username, data: []
            }, (err, docs) => {
                if (docs) {
                    console.log(docs);
                }
            })
            req.session.user_id = user._id; // login the user after register
            res.status(200).send('User Registered');
        }
    })
}

module.exports.login = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    // find and validate user
    const foundUser = await User.findAndValidate(username, password)
    if (foundUser) { // if user found
        // log him in
        req.session.user_id = foundUser._id;
        res.status(200).send('Logged In Successfully');
    } else {
        res.status(404).send('Invalid Username/Password');
    }
}

module.exports.getLogin = (req, res) => {
    res.render('login');
}

module.exports.getRegister = (req, res) => {
    res.render('register');
}

module.exports.home = (req, res)=>{
    res.render('home');
}

module.exports.logout = (req, res) => {
    req.session.destroy(); // destroy session
    res.status(200).send('Logged Out')
}