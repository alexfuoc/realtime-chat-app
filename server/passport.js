var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../server/models/user");
var bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;
const SECRET = "BFNdfsafdOBUJla253nmdsa455vndf";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      //call db for user, check password and sign in
      console.log("Inside the Local Strategy callback");
      console.log("email + password: ", email + ", " + password);
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect email or password." });
        } else {
          bcrypt.compare(password, user.password, function (err, result) {
            console.log("Inside the bcrypt pw match callback");
            console.log(user);
            if (err) return done(err);
            if (result === true) {
              console.log(
                "Local Strategy returned true, Correct email and Password"
              );
              return done(null, user, { message: "Logged In Successfully" });
            }
            return done(null, false, {
              message: "Incorrect email or password.",
            });
          });
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("Inside Serialze User callback");
  console.log(user);
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
