///////////////////
const mongoose = require("mongoose");
/// here i created a schema///
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
///  create a model(class) for that schema///////
const User = mongoose.model("User", userSchema);
module.exports = User;
