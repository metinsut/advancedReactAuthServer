const index = require('../controllers/index');
const signUp = require('../controllers/signUp');
const deleteUser = require('../controllers/delete');
const signIn = require('../controllers/signIn');

const passwordService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const Route = app => {
    app.use('/home', requireAuth, index);
    app.use('/signup', signUp);
    app.use('/signin', requireSignin, signIn);
    app.use('/delete', deleteUser);
};

module.exports = Route;
