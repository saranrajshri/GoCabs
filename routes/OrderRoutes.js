const express = require("express");
const router = express.Router();
const Order = require("../models/OrdersSchema");

router.post("/addOrder", function(req, res) {
  Order.find({ driverid: req.body.driverid })
    .exec()
    .then(order => {
      if (!(order.length >= 1)) {
        var data = {
          userid: req.body.userid,
          driverid: req.body.driverid,
          originLat: req.body.originLat,
          originLon: req.body.originLon,
          originTitle: req.body.originTitle,
          destinationLat: req.body.destinationLat,
          destinationLon: req.body.destinationLon,
          destinationTitle: req.body.destinationTitle,
          isRideFinished: req.body.isRideFinished
        };
        var order = new Order(data);
        order.save().then(response => {
          res.send(response);
        });
      } else {
        Order.findOneAndUpdate(
          { driverid: req.body.driverid },
          {
            userid: req.body.userid,
            driverid: req.body.driverid,
            originLat: req.body.originLat,
            originLon: req.body.originLon,
            originTitle: req.body.originTitle,
            destinationLat: req.body.destinationLat,
            destinationLon: req.body.destinationLon,
            destinationTitle: req.body.destinationTitle,
            isRideFinished: req.body.isRideFinished
          }
        ).then(response => {
          res.send(response);
        });
      }
    });
});

// check
router.post("/checkForOrders", function(req, res) {
  Order.find({ driverid: req.body.driverid, isRideFinished: false }).then(
    response => {
      res.send(response);
    }
  );
});

//get orderds
router.post("/getOrders", function(req, res) {
  Order.find({ userid: req.body.userid }).then(response => {
    res.send(response);
  });
});

//
router.post("/updateLandmarkpic", function(req, res) {
  Order.findOneAndUpdate(
    { userid: "5d09f1701030f70f41bf2d2f" },
    { landMarkPicture: "myImage-landmark" }
  ).then(response => {
    res.send(response);
  });
});
module.exports = router;
