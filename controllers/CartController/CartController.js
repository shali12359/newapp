const mongoose = require("mongoose");
const Cart = require("../../model/CartModels/Cart");
const texts = require("../../constants/texts");

//Add new product entry to the cart
exports.addToCart = (req, res, next) => {
  const { body } = req;
  const {
    UserID,
    DressCode,
    Subtype,
    Description,
    ProductId,
    Quantity,
    DressPrice,
    DressImage,
    Total,
  } = body;

  const newCartEntry = new Cart();
  newCartEntry.UserID = UserID;
  newCartEntry.DressCode = DressCode;
  newCartEntry.Subtype = Subtype;
  newCartEntry.Description = Description;
  newCartEntry.ProductId = ProductId;
  newCartEntry.Quantity = Quantity;
  newCartEntry.DressPrice = DressPrice;
  newCartEntry.DressImage = DressImage;
  newCartEntry.Total = Total;

  newCartEntry
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Item has been added to the cart sucessfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//get all the cart items 
exports.getAllCartEntries = (req, res) => {
  Cart.find((err, cart) => {
    if (err) {
      console.log(err);
    } else {
      res.json(cart);
    }
  });
};

//edit product entry detailes inside the cart
exports.editCartEntry = (req, res) => {
  const { body } = req;
  const {
    UserID,
    DressCode,
    Subtype,
    Description,
    ProductId,
    Quantity,
    DressPrice,
    DressImage,
    Total,
  } = body;

  Cart.findById(req.params.id, (err, cart) => {
    if (!cart)
      res
        .status(404)
        .send("Error - Could not find the cart item inside the cart");
    else {
      cart.UserID = UserID;
      cart.DressCode = DressCode;
      cart.Subtype = Subtype;
      cart.Description = Description;
      cart.ProductId = ProductId;
      cart.Quantity = Quantity;
      cart.DressPrice = DressPrice;
      cart.DressImage = DressImage;
      cart.Total = Total;

      cart
        .save()
        .then((cart) => {
          res.json({
            message: "Your cart has been updated!!",
          });
        })
        .catch((err) => {
          res.json({
            message: "Error - Could not update the cart",
          });
        });
    }
  });
};


//get the cart products for the specific user
exports.userInCart = (req, res, next) => {
  const { body } = req;

  const { UserID } = body;
  Cart.find({
    UserID,
  })
    .exec()
    .then((cart) => {
      if (cart.length < 1) {
        return res.json({
          message: "Cart not existing",
        });
      } else {
        res.json({
          cart,
          message: "Cart existing",
        });
      }
    });
};


//get cart entry of a user
exports.getCartEntry = (req, res) => {
  let userid = req.params.id;
  Cart.findById(userid)
    .then((cart) => res.json(cart))
    .catch((err) => res.status(400).json("Error: " + err));
};

//remove product from the cart 
exports.deleteCartEntry = (req, res, next) => {
  Cart.remove({ _id: req.params.id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Cart entry deleted",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};