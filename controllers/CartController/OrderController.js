const Order = require("../../model/CartModels/Order");
const texts = require("../../constants/texts");


//add new order entry
exports.addOrder = (req, res, next) => {
  const { body } = req;

  const {
    OrderId,
    UserID,
    DressCode,
    Subtype,
    Description,
    ProductId,
    Quantity,
    DressPrice,
    DressImage,
    Total,
    PlacedDate,
  } = body;

  const newOrderEntry = new Order();
  newOrderEntry.OrderId = OrderId;
  newOrderEntry.UserID = UserID;
  newOrderEntry.DressCode = DressCode;
  newOrderEntry.Subtype = Subtype;
  newOrderEntry.Description = Description;
  newOrderEntry.ProductId = ProductId;
  newOrderEntry.Quantity = Quantity;
  newOrderEntry.DressPrice = DressPrice;
  newOrderEntry.DressImage = DressImage;
  newOrderEntry.Total = Total;
  newOrderEntry.PlacedDate = PlacedDate;

  newOrderEntry
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Your Order has been placed Sucessfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//get the order history entries of the specific user
exports.userInOrder = (req, res, next) => {
  const { body } = req;

  const { UserID } = body;
  Order.find({
    UserID,
  })
    .exec()
    .then((order) => {
      if (order.length < 1) {
        return res.json({
          message: "Order not existing",
        });
      } else {
        res.json({
          order,
          message: "Order existing",
        });
      }
    });
};