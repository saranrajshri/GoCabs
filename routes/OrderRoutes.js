const express = require("express");
const router = express.Router();
const Order = require("../models/OrdersSchema");

router.post("/addOrder", function(req, res) {
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
});

// check
router.post("/checkForOrders", function(req, res) {
  Order.find({ driverid: req.body.driverid, isRideFinished: false }).then(
    response => {
      res.send(response);
    }
  );
});
module.exports = router;
