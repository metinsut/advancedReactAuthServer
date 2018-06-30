const passport = require('passport');
const userSchema = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jtwLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    const matchUser = userSchema.findById(payload.sub);
    matchUser
        .then(user => {
            if (user) {
                done(null, user);
            } else {
                done(null, fasle);
            }
        })
        .catch(err => {
            done(err, false);
        });
});

const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    const findUser = userSchema.findOne({ email: email });
    findUser
        .then(user => {
            if (!user) {
                return done(null, false);
            } else {
                return done(null, user);
            }
        })
        .catch(err => {
            res.json(err);
        });
});

passport.use(jtwLogin);
passport.use(localLogin);
