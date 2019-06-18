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
  }
});
const User = mongoose.model("user", UserSchema);
module.exports = User;
