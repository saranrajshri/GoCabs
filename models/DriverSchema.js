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

  lat: {
    type: Number
  },
  lon: {
    type: Number
  },
  vechileName: {
    type: String
  },
  vechileNumber: {
    type: String
  },
  capacity: {
    type: Number
  }
});
const DriverUser = mongoose.model("driver", DriverSchema);
module.exports = DriverUser;
