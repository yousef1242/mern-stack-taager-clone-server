const mongoose = require("mongoose");

const productShcema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    country: {
      type: String,
    },
    category: {
      type: String,
    },
    currency: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
    },
    sizes: {
      type: Array,
      default: [],
    },
    images: [],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productShcema);

module.exports = {
  Product,
};
