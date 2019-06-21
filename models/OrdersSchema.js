const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  userid: {
    type: String
  },
  driverid: {
    type: String
  },
  originLat: {
    type: Number
  },
  originLon: {
    type: Number
  },
  destinationLat: {
    type: Number
  },
  destinationLon: {
    type: Number
  },
  originTitle: {
    type: String
  },
  destinationTitle: {
    type: String
  },

  isRideFinished: {
    type: Boolean
  },
  landMarkPicture: {
    type: String
  }
});
const order = mongoose.model("orders", OrderSchema);
module.exports = order;
