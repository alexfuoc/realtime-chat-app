var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var passport = require("passport");
var User = require("../models/user");

const SALT_ROUNDS = 10;

function findInDb(email, username) {
  User.find({ email: email, username: username }).then((user) => {
    // prints null if not found or prints the user object
    console.log("user is: " + user);
    return user;
  });
}

function insertIntoDb(email, username, password_hash) {
  console.log("inserting into db");
  User.create(
    { email: email, username: username, password: password_hash },
    function (err, user) {
      if (err) return console.log(err);
      // saved!
      console.log(user);
    }
  );
}

function signup(email, username, password) {
  console.log("Signing up");
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_ROUNDS, function (err, salt) {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          reject(err);
        }
        console.log(hash);
        insertIntoDb(email, username, hash);
        resolve();
      });
    });
  });
}

router.post("/signup/", function (req, res, next) {
  let params = req.body;
  console.log(params);

  User.findOne({ email: params.email, username: params.username }, function (
    err,
    user
  ) {
    if (err) {
      console.log(err);
    }
    if (!user) {
      signup(params.email, params.username, params.password)
        .then((r) => res.json({ message: "Success" }))
        .catch((r) => {
          res.status(400);
          res.json({ message: "Failed" });
        });
    } else if (user.email === params.email) {
      res.status(403).json({ message: "Already signed up." });
    } else {
      signup(params.email, params.username, params.password)
        .then((r) => res.json({ message: "Success" }))
        .catch((r) => {
          res.status(400);
          res.json({ message: "Failed" });
        });
    }
  });
});

router.post("/", function (req, res, next) {
  console.log("Inside POST /login callback");
  passport.authenticate("local", (err, user, info) => {
    console.log("Inside passport.authenticate() callback");
    console.log(
      `req.session.passport: ${JSON.stringify(req.session.passport)}`
    );
    console.log(`req.user: ${JSON.stringify(req.user)}`);
    // if (err) {
    //   console.log("Error Inside passport.authenticate() callback");
    //   return res.status(400).json({
    //     message: "Something is not right",
    //     user: user,
    //   });
    // }
    req.login(user, (err) => {
      console.log("Inside req.login() callback");
      console.log(
        `req.session.passport: ${JSON.stringify(req.session.passport)}`
      );
      console.log(`req.user: ${JSON.stringify(req.user)}`);
      if (err) {
        console.log("Error Inside req.login() callback");
        res.json({ error: err });
      }
      return res.json({ message: "Logged in." });
    });
  })(req, res, next);
});

module.exports = router;
