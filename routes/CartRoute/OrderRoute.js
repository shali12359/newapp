const express = require("express");
const OrderRoute = express.Router();
const OrderController = require("../../controllers/CartController/OrderController");

OrderRoute.post("/create", OrderController.addOrder);
OrderRoute.post("/getOrderHistory", OrderController.userInOrder);

module.exports = OrderRoute;
