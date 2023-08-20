const mongoose = require("mongoose");

const orderShcema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantaty: {
          type: Number,
        },
      },
    ],
    fullname: {
      type: String,
    },
    orderNumber: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    goverment: {
      type: String,
    },
    address: {
      type: String,
    },
    userPageNameOnFacebook: {
      type: String,
    },
    userPageLinkOnFacebook: {
      type: String,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      default: "تم استلام الطلب",
    },
    isCancled: {
      type: Boolean,
      default: false,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalProfit: {
      type: Number,
      default: 0,
    },
    orderTo: {
      type: String,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderShcema);

module.exports = {
  Order,
};
