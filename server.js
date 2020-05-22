const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // help to connect mongodb database
const texts = require("./constants/texts"); //take constant to prompt messages
const serverMessages = texts.server;

//create express server
const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors()); // cors middaleware
app.use(express.json()); // allows to get JSON

//connect to the mongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI || serverMessages.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(serverMessages.DB_CONNECTED);
  })
  .catch(() => {
    console.log(serverMessages.DB_NOT_CONNECTED);
  });

const adminRouteCreateManager = require("./routes/adminRoute/managerRoute");
app.use("/storemanager", adminRouteCreateManager);

const adminRouteCategory = require("./routes/adminRoute/CategoryRote");
app.use("/category", adminRouteCategory);

const userRoute = require("./routes/UserRoutes/userRouter");
app.use("/user", userRoute);

const productRoute = require("./routes/ProductRoute/productRouters");
app.use("/product", productRoute);

//use this to show the image you have in node js server to client (react js)
app.use("/uploads", express.static("uploads"));

const cartRoute = require("./routes/CartRoute/CartRoute");
app.use("/cart", cartRoute);

const wishlistRoute = require("./routes/WishlistRoute/wishlistRoute");
app.use("/wishlist", wishlistRoute);

const commentRoute = require("./routes/CommentRoute/commentRoute");
app.use("/comment", commentRoute);

const orderRoute = require("./routes/CartRoute/OrderRoute");
app.use("/order", orderRoute);

const paymentRoute = require("./routes/CartRoute/PaymentRoute");
app.use("/payment", paymentRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static('frontend_online_shopping_store/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend_online_shopping_store', 'build', 'index.html'));
  });
}
// server listening port
app.listen(port, () => {
  console.log(serverMessages.SERVER + port);
});
