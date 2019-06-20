const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  location: {
    coordinates: {
      type: [Number],
      index: "2dsphere"
    }
  },
  searchingForCabs: {
    type: Boolean
  },
  originData: {
    type: [Number]
  },
  destinationData: {
    type: [Number]
  },
  originTitle: {
    type: String
  },
  destinationTitle: {
    type: String
  },
  orderAccepted: {
    type: String
  },
  driverID: {
    type: String
  }
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
