const mongoose = require("mongoose");

const cartShcema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    quantaty: {
      type: Number,
      default: 1,
    },
    size: {
      type: String,
    },
    country : {
      type : String
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartShcema);

module.exports = {
  Cart,
};
