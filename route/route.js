const index = require("../controllers/index");
const signUp = require("../controllers/signUp");
const deleteUser = require("../controllers/delete");
const signIn = require("../controllers/signIn");

const passwordService = require("../services/passport");
const passport = require("passport");

// const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

const Route = app => {
   app.use(
      "/home",
      function(req, res, next) {
         passport.authenticate("jwt", (err, user, info) => {
            if (err) {
               return next(err);
            }
            if (!user) {
               return res.json({ message: err });
            }
            req.logIn(user, function(err) {
               if (err) {
                  return next(err);
               }
               return res.json(user);
            });
         })(req, res, next);
      },
      index
   );
   app.use("/signup", signUp);
   app.use("/signin", requireSignin, signIn);
   app.use("/delete", deleteUser);
};

module.exports = Route;
