const express = require("express");
const ProductRouter = express.Router();
const ProductController = require('../../controllers/productController/productController');
const checkAuth = require("../../auth/checkAuthorization");

ProductRouter.post("/uploadImage", ProductController.UploadImage);
ProductRouter.post("/create", ProductController.addProduct);
ProductRouter.get("/", ProductController.getAllProducts);
ProductRouter.get("/:id", ProductController.getProduct);
ProductRouter.put("/update/:id", ProductController.editProduct);
ProductRouter.delete("/delete/:id",ProductController.deleteProduct);

module.exports = ProductRouter;