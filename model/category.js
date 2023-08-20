const mongoose = require("mongoose");

const categoryShcema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categoryShcema);

module.exports = {
  Category,
};
