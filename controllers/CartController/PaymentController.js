const Payment = require("../../model/CartModels/Payment");
const texts = require("../../constants/texts");


//add payment entry 
exports.addPayment = (req, res, next) => {
    const { body } = req;

    const {
        OrderID,
        UserID,
        Total,
        Address,
        PaymentType,
        Name,
    } = body;

    const newPaymentEntry = new Payment();
    newPaymentEntry.OrderID = OrderID;
    newPaymentEntry.UserID = UserID;
    newPaymentEntry.Total = Total;
    newPaymentEntry.Address = Address;
    newPaymentEntry.PaymentType = PaymentType;
    newPaymentEntry.Name = Name;



    newPaymentEntry
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Your Payment Entry has been entred Sucessfully",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

//get the payment entry for the specific user
exports.userInPayment = (req, res, next) => {
    const { body } = req;

    const { UserID } = body;
    Payment.find({
        UserID,
    })
        .exec()
        .then((payment) => {
            if (payment.length < 1) {
                return res.json({
                    message: "Payment history not existing",
                });
            } else {
                res.json({
                    payment,
                    message: "payment history existing",
                });
            }
        });
};