const index = require('../controllers/index');
const signUp = require('../controllers/signUp');

const Route = app => {
    app.use('/', index);
    app.use('/signup', signUp);
};

module.exports = Route;
