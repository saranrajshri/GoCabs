const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },

  vechileName: {
    type: String
  },
  vechileNumber: {
    type: String
  },
  capacity: {
    type: Number
  },

  location: {
    coordinates: {
      type: [Number],
      index: "2dsphere"
    }
  }
});
const DriverUser = mongoose.model("driver", DriverSchema);
module.exports = DriverUser;
