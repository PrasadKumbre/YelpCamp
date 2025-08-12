const User = require('../models/user');

module.exports.showRegistrationPage = (req, res) => {
    res.render('users/register');
};

module.exports.registerUser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body.user;
        const user = new User({ email, username });
        const registerUser = await User.register(user, password);
        req.login(registerUser, err => {
            if (err) next(err);
            req.flash("success", "Account Created Successfully :)");
            res.redirect('/');
        })
    }
    catch (error) {
        req.flash("error", error.message);
        res.redirect('register')
    }
};

module.exports.showLoginPage = (req, res) => {
    res.render('users/login');
};

module.exports.userLogin = (req, res) => {

    req.flash('success', 'Welcome to campground');
    const redirectUrl = res.locals.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.userLogout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/');
    });
};