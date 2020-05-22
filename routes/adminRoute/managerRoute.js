const express = require("express");
const StoreManagerRoute = express.Router();
const ManagerController = require("../../controllers/AdminController/StoreManagerController");
const checkAuth = require("../../auth/checkAuthorization");

StoreManagerRoute.post("/create", ManagerController.addManager);
StoreManagerRoute.get("/", ManagerController.getAllManager);
StoreManagerRoute.get("/:id", ManagerController.getManager);
StoreManagerRoute.put("/update/:id", ManagerController.editManager);
StoreManagerRoute.delete("/delete/:id", checkAuth ,ManagerController.deleteManager);

module.exports = StoreManagerRoute;