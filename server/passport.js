var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../server/models/user");
var bcrypt = require("bcrypt");
var passportJWT = require("passport-jwt");
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;

const SALT_ROUNDS = 10;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, cb) {
      //call db for user, check password and sign in
      return User.findOne({ email })
        .then((user) => {
          var passwordMatch = bcrypt.compare(password, user.password, function (
            err,
            result
          ) {
            if (err) return false;
            return result;
          });
          if (!user || passwordMatch) {
            return cb(null, false, { message: "Incorrect email or password." });
          }
          return cb(null, user, { message: "Logged In Successfully" });
        })
        .catch((err) => cb(err));
    }
  )
);
