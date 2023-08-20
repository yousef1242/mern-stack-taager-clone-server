const mongoose = require("mongoose");

const withdrawShcema = new mongoose.Schema(
  {
    amount: {
      type: Number,
    },
    paypalAccount: {
      type: String,
    },
    countryCurruncy: {
      type: String,
    },
    userId: {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User"
    },
    isSend : {
        type : Boolean,
        default : false
    }
  },
  { timestamps: true }
);

const Withdraw = mongoose.model("Withdraw", withdrawShcema);

module.exports = {
  Withdraw,
};
