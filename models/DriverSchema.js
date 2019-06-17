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
  }
});
const DriverUser = mongoose.model("driver", DriverSchema);
module.exports = DriverUser;
