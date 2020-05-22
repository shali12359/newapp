const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Cart = new Schema(
  {
    UserID: {
      type: String
    },
    DressCode: {
      type: String
    },
    Subtype: {
      type: String
    },
    Description: {
      type: String
    },
    ProductId: {
      type: String
    },
    Quantity: {
      type: Number
    },
    DressPrice: {
      type: Number,

    },
    DressImage: {
      type: String
    },
    Total: {
      type: Number
    }
  },
  {
    collection: "Cart",
  });

module.exports = mongoose.model("Cart", Cart);
