const express = require("express");
const CartRoute = express.Router();
const CartController = require("../../controllers/CartController/CartController");

CartRoute.post("/create", CartController.addToCart);
CartRoute.get("/", CartController.getAllCartEntries);
CartRoute.get("/:id", CartController.getCartEntry);
CartRoute.post("/getCartUser", CartController.userInCart);
CartRoute.get("/getItem/:id/:item", CartController.getCartEntry);
CartRoute.put("/update/:id", CartController.editCartEntry);
CartRoute.delete("/delete/:id", CartController.deleteCartEntry);

module.exports = CartRoute;


