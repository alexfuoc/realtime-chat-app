var express = require("express");
var router = express.Router();
var Message = require("../models/messages");

/* GET home page. */
router.get("/", function (req, res, next) {
  Message.find()
    .sort({ $natural: -1 })
    .limit(50)
    .exec(function (err, messages) {
      if (err) {
        res.status(400).json({ error: "Failed to get messages." });
      }
      res.json(messages);
    });
});

module.exports = router;
