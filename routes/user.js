const express = require('express');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware/auth');
const router = express.Router({ mergeParams: true });
const user = require('../controllers/usres');

router.route('/register')
    .get(user.showRegistrationPage)
    .post(catchAsync(user.registerUser))

router.route('/login')
    .get(user.showLoginPage)
    .post(storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.userLogin)

router.get('/logout', user.userLogout);

module.exports = router;