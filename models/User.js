const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: String,
  first_name: String,
  last_name: String,
  password: String,
  admin: {
   type: Boolean,
   default: false
  },
});
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
