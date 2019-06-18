const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const session = require("express-session");
// Schema
const User = require("../models/schema");

// Hasing Password
function hash(input, salt) {
  var hashedString = crypto.pbkdf2Sync(input, salt, 10000, 512, "sha512");
  return ["pbkdf2S", "10000", salt, hashedString.toString("hex")].join("$");
}
var sess;
// Add User
router.post("/addUser", function(req, res) {
  User.find({ email: req.body.email })
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
          password: hashedPassword,
          location: {
            coordinates: [0, 0]
          },
          searchingForCabs: false,
          originData: [],
          destinationData: []
        };
        var user = new User(data);
        user.save().then(function(response) {
          res.send(response);
        });
      }
    });
});

//login request
router.post("/loginUser", function(req, res) {
  User.find({ email: req.body.email })
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
          sess = user;
          req.session.user = sess;
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
    if (sess) {
      res.status(200).send(sess);
    } else {
      next();
    }
  },
  (req, res) => {
    res.send(null);
  }
);
// update details to user schema
router.put("/updateUserSchema", function(req, res) {
  User.findOneAndUpdate(
    { _id: req.body.id },
    {
      searchingForCabs: true,
      originData: [req.body.originLat, req.body.originLon],
      destinationData: [req.body.destinationLat, req.body.destinationLon]
    }
  ).then(response => {
    res.send(response);
  });
});
//find nearby drivers
router.post("/findNearByUsers", function(req, res) {
  User.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(req.body.lat), parseFloat(req.body.lon)]
        },
        key: "location",
        distanceField: "distance",
        maxDistance: 50000,
        spherical: true,
        query: { searchingForCabs: true }
      }
    }
  ]).then(response => {
    res.send(response);
  });
});
module.exports = router;
