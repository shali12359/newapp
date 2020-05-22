const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Payment = new Schema(
    {
        UserID: {
            type: String
        },
        OrderID: {
            type: String
        },
        Total: {
            type: String
        },
        Address: {
            type: String
        },
        PaymentType: {
            type: String
        },
        Name: {
            type: String
        }
    },
    {
        collection: "Payment",
    });

module.exports = mongoose.model("Payment", Payment);