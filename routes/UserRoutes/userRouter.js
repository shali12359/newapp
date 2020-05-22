const express = require("express");
const userRouter = express.Router();
const UserController = require('../../controllers/UserController/UserController');
const checkAuth = require("../../auth/checkAuthorization");

userRouter.post("/sign-up", UserController.user_signup);
userRouter.post('/sign-in', UserController.userSignin);
userRouter.post('/sign-out', UserController.user_signout);
userRouter.post('/validate', UserController.user_validate);
userRouter.get('/', UserController.GetAlluser_details);
userRouter.delete("/delete/:id",checkAuth,UserController.deleteUser);

module.exports = userRouter;