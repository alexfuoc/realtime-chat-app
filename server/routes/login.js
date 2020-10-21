var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var User = require("../models/user");

const SALT_ROUNDS = 10;

function insertIntoDb(email, username, password_hash) {
  console.log("inserting into db");
  User.create(
    { email: email, username: username, password: password_hash },
    function (err, user) {
      if (err) return handleError(err);
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

  signup(params.email, params.username, params.password)
    .then((r) => res.json({ message: "Success" }))
    .catch((r) => {
      res.status(400);
      res.json({ message: "Failed" });
    });
});

module.exports = router;
