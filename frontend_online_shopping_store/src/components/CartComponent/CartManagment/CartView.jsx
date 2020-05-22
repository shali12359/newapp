import React, { Component } from "react";
// Import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "./cartStyles.css";
import NavBar from "../../Home/NavBar";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import CartDetails from "./CartDetails";

export default class CartView extends Component {
  constructor(props) {
    const cookies = new Cookies();
    let user = cookies.get("user");

    super(props);
    this.state = {
      user: user,
      Subtype: "",
      Cart: [],
      Total: 0,
      message: "",
    };

    // - {this.state.user.userId}
    this.renderCards = this.renderCards.bind(this);
  }

  async componentDidMount() {
    const cookies = new Cookies();
    let user = cookies.get("user");

    if (user) {
      const uid = {
        UserID: user.userId,
      };

      const resusertemp = await axios.post(
        "http://localhost:5000/cart/getCartUser",
        uid
      );

      this.setState({
        Cart: resusertemp.data.cart,
        message: resusertemp.data.message,
      });

      let total = 0;
      this.state.Cart.map(function (object, i) {
        total = total + object.Total;
      });

      this.setState({
        Total: total,
      });

    } else {
      alert("Please Log In..!");
      window.location.href = "/sign-in";
    }
  }
  setTot() {
    const total = 0;
    this.state.Cart.map(function (object, i) {
      total = total + object.Total;
    });
    this.setState({
      Total: total,
    });
  }

  emptCart() {
    alert("Your Shopping Cart is Empty Right Now..!");
    window.location.href = "/log";
  }

  renderCards() {

    if (this.state.message === "Cart not existing") {
      this.emptCart();
    } else {
      return this.state.Cart.map(function (object, i) {
        return <CartDetails obj={object} key={i} />;
      });
    }
  }

  getState() {
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="main-container">
          <h1 className="page-header ml-4">My Shopping Cart </h1>
          <div className="container mt-4 category-container">
            <div class="btn-group btn-group-medium" align="center">
              <div className="container mt-4 category-container">
                <div className="row">{this.renderCards()}</div>
              </div>
              <div className="mt-4 ">
                <Card
                  bg="light"
                  className="mr-4 mb-4 wishlist-card"
                  style={{ width: "18rem" }}
                >
                  <Card.Body bg-dark>

                    <Card.Title className="sub-total">
                      <b>Cart Summery</b>
                    </Card.Title>

                    <Card.Title className="text-center mt-4 mb-4">
                      Sub Total : LKR {this.state.Total}
                    </Card.Title>

                    <Link
                      variant="dark"
                      to={{
                        pathname: "/checkout",
                        aboutProps: this.state,
                      }}
                    >
                      <Button variant="dark" className="mb-2 ml-3 mr-3">
                        Proceed To Checkout
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}