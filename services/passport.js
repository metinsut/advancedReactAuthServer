const passport = require("passport");
const userSchema = require("../models/user");
const config = require("../config");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

passport.serializeUser(function(user, done) {
   done(null, user.id);
});
passport.deserializeUser(function(user, done) {
   done(null, user.id);
});

const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromHeader("authorization"),
   secretOrKey: config.secret
};

const jtwLogin = new JwtStrategy(jwtOptions, (payload, done) => {
   const matchUser = userSchema.findById(payload.sub).select("email");
   console.log(payload);
   matchUser
      .then(user => {
         if (user) {
            done(null, user);
         } else {
            done(null, false);
         }
      })
      .catch(err => {
         done(err, false);
      });
});

const localOptions = { usernameField: "email" };

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
