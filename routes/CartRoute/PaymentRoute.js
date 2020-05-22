const express = require("express");
const PaymentRoute = express.Router();
const PaymentController = require("../../controllers/CartController/PaymentController");

PaymentRoute.post("/create", PaymentController.addPayment);
PaymentRoute.post("/getPaymentHistory", PaymentController.userInPayment);

module.exports = PaymentRoute;