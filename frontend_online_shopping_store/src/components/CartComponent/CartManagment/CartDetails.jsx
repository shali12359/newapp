import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Cookies from "universal-cookie";
import "./cartStyles.css";
import "bootstrap/dist/css/bootstrap.min.css";

class CartDetails extends Component {
  constructor(props) {
    const cookies = new Cookies();
    let user = cookies.get("user");

    super(props);
    this.state = {
      user: user,
      Subtype: "",
      cid: this.props.obj._id,
      name: this.props.obj.Description,
      Quantity: this.props.obj.Quantity,
      Cart: [],
    };
    this.renderCards = this.renderCards.bind(this);
  }

  updateQty() {

    const item = {
      UserID: this.state.user.userId,
      DressCode: this.props.obj.DressCode,
      Subtype: this.props.obj.Subtype,
      Description: this.props.obj.Description,
      ProductId: this.props.obj.ProductId,
      Quantity: this.state.Quantity,
      DressPrice: this.props.obj.DressPrice,
      DressImage: this.props.obj.DressImage,
      Total: this.state.Quantity * this.props.obj.DressPrice,
    };

    axios
      .put("http://localhost:5000/cart/update/" + this.props.obj._id, item)
      .then((response) => {
        window.location.href = "/cartview";
        alert(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });


    window.location.href = "/cartview";
  }

  decrementQunatity = async () => {
    if (this.state.Quantity > 1) {
      this.setState({
        Quantity: this.state.Quantity - 1,
      });
    }
    this.updateQty();
  };

  incrementQunatity = async () => {
    this.setState({
      Quantity: this.state.Quantity + 1,
    });

    this.updateQty();
  };

  removeFromCart() {
    axios
      .delete("http://localhost:5000/cart/delete/" + this.state.cid)
      .then(console.log("Deleted"))
      .catch((err) => console.log(err));

    alert("Item has removed from Cart..!");
    window.location.href = "/cartview";

  }

  renderCards() {
    if (this.state.user) {
      const userId = this.state.user.userId;

      if (this.props.obj.UserID == userId) {
        return (

          <Card className="mr-4 mb-4 wishlist-card" style={{ width: "18rem" }}>

            <Link>
              <Card.Img
                variant="top"
                src={`http://localhost:5000/${this.props.obj.DressImage}`}
              />
            </Link>

            <Card.Body>
              <Card.Text className="text-center">
                {this.props.obj.Description}
              </Card.Text>

              <Card.Title className="text-center">
                {this.props.obj.DressCode}
              </Card.Title>

              <Card.Title className="text-center">
                LKR {this.props.obj.DressPrice}
              </Card.Title>

              <div className="btn-group btn-group-medium" align="center">
                <Button
                  onClick={(e) => this.decrementQunatity()}
                  variant="dark"
                  className="mr-4"
                >
                  <i class="fa fa-minus-square"></i>
                </Button>

                <Card.Text className="text-center">
                  Quantity {this.state.Quantity}
                </Card.Text>

                <Button
                  onClick={(e) => this.incrementQunatity()}
                  variant="dark"
                  className="ml-4"
                >
                  <i class="fa fa-plus-square"></i>
                </Button>

              </div>

              <Button
                onClick={(e) => this.removeFromCart()}
                variant="outline-dark"
                className="mb-2 mt-3"
                block
              >
                <i class="fas fa-trash mr-2" /> Remove From Cart
              </Button>
            </Card.Body>
          </Card>
        );
      }
    } else {
      alert("Please Log In..!");
      window.location.href = "/sign-in";
    }
  }

  render() {
    return (
      <div>
        {console.log(this.props.obj.Description)}
        {this.renderCards()}
      </div>
    );
  }
}

export default CartDetails;