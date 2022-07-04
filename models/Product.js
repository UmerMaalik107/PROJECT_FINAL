const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  description: String,
  images: [{type: String}],
  price: Number,
  brand: {
    type: mongoose.Schema.ObjectId,
    ref: "brand",
  },
});
const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;
