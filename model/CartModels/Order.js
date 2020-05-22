const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Order = new Schema(
  {
    OrderId: {
      type: String,
      required: true,
    },

    UserID: {
      type: String,
      required: true,
    },
    DressCode: {
      type: String,
    },
    Subtype: {
      type: String,
    },
    Description: {
      type: String,
    },
    ProductId: {
      type: String,
    },
    Quantity: {
      type: Number,
    },
    DressPrice: {
      type: Number,
    },
    DressImage: {
      type: String,
    },
    Total: {
      type: Number,
    },

    PlacedDate: {
      type: Date,
    },
  },

  {
    collection: "OrderHistory",
  }
);

module.exports = mongoose.model("OrderHistory", Order);
