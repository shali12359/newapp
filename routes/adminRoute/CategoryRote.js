const express = require("express");
const CategoryRoute = express.Router();
const CategoryController = require("../../controllers/AdminController/categoryController");
const checkAuth = require("../../auth/checkAuthorization");

CategoryRoute.post("/create", CategoryController.addCategory);
CategoryRoute.get("/", CategoryController.getAllCategory);
CategoryRoute.get("/:id", CategoryController.getCategory);
CategoryRoute.put("/update/:id", CategoryController.editCategory);
CategoryRoute.delete("/delete/:id", checkAuth, CategoryController.deleteCategory);
CategoryRoute.delete("/getClicked/:id", CategoryController.getClickedCategory);
CategoryRoute.post("/uploadImage", CategoryController.UploadImage);

module.exports = CategoryRoute;
