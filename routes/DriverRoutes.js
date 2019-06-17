const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const session = require("express-session");
// Schema
const Driver = require("../models/DriverSchema");

// Hasing Password
function hash(input, salt) {
  var hashedString = crypto.pbkdf2Sync(input, salt, 10000, 512, "sha512");
  return ["pbkdf2S", "10000", salt, hashedString.toString("hex")].join("$");
}
var driverSess;
// Add User
router.post("/addDriver", function(req, res) {
  Driver.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(401).json({
          message: "mail exists"
        });
      } else {
        var salt = crypto.randomBytes(128).toString("hex");
        var hashedPassword = hash(req.body.password, salt);
        var data = {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword
        };
        var user = new Driver(data);
        user.save().then(function(response) {
          res.send(response);
        });
      }
    });
});

//login request
router.post("/loginDriver", function(req, res) {
  Driver.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        var actualPassword = user[0].password;
        var salt = actualPassword.split("$")[2];
        var hashedPassword = hash(req.body.password, salt);
        if (actualPassword == hashedPassword) {
          req.session.user = user[0];
          var user = {
            username: req.session.user.username,
            email: req.session.user.email,
            id: req.session.user.id
          };
          driverSess = user;
          req.session.user = driverSess;
          res.send(req.session.user);
        } else {
          res.status(401).send("Error");
        }
      } else if (user.length == 0) {
        res.status(404).send({ message: "no user found" });
      }
    });
});

//whoami reqeust
router.post(
  "/whoami",
  function(req, res, next) {
    if (driverSess) {
      res.status(200).send(driverSess);
    } else {
      next();
    }
  },
  (req, res) => {
    res.send(null);
  }
);

module.exports = router;
