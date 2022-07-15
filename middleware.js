// create middle ware

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user_id) {
        return res.render("message", { msgid: 2 });
    }
    next();
}