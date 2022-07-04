const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  name: String,
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "category",
  },
});
const BrandModel = mongoose.model("brand", brandSchema);

module.exports = BrandModel;
