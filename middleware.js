// create middle ware

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user_id) {
        return res.status(400).send('User Should Be logged in!!');
    }
    next();
}