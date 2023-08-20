const mongoose = require("mongoose");

const userShcema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    egyptBalance: {
      type: Number,
      default: 0,
    },
    emaratBalance: {
      type: Number,
      default: 0,
    },
    sudiaBalance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userShcema);

module.exports = {
  User,
};
