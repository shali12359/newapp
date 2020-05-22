import React, { Component } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../../Home/HomeStyle.css";
import Cookies from "universal-cookie";

class DisplayWishlist extends Component {
  constructor(props) {
    const cookies = new Cookies();
    let user = cookies.get("user");
    super(props);

    this.state = {
      user: user,
      Subtype: "",
      Images: [],
      Wishlist: [],
    };

    this.renderCards = this.renderCards.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/wishlist/display")
      .then((response) => {
        this.setState({ Wishlist: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteItem = (e) => {
    e.preventDefault();

    console.log("Delete");

    axios
      .delete("http://localhost:5000/wishlist/delete/" + this.props.obj._id)
      .then(console.log("Deleted"))
      .catch((err) => console.log(err));

    alert("Wishlist Item Deleted..!");
    window.location.href = "/wishlist";
  };

  async addToCart() {
    const product = await axios
      .get("http://localhost:5000/product/" + this.props.obj.ProductId)
      .then(console.log("product recived"))
      .catch((err) => console.log(err));

    console.log(product);
    const obj = {
      UserID: this.state.user.userId,
      DressCode: product.data.DressCode,
      Subtype: product.data.Subtype,
      Description: product.data.description,
      ProductId: product.data._id,
      Quantity: 1,
      DressPrice: product.data.DressPrice,
      DressImage: product.data.images[0],
      Total: product.data.DressPrice,
    };

    const resp = await axios.post("http://localhost:5000/cart/create", obj);
    window.location.href = "/cartview";
    alert(resp.data.message);
    console.log(resp);

    axios
      .delete("http://localhost:5000/wishlist/delete/" + this.props.obj._id)
      .then(console.log("Deleted"))
      .catch((err) => console.log(err));

    window.location.href = "/cartview";
  }

  renderCards() {
    if (this.state.user) {
      const userId = this.state.user.userId;

      if (this.props.obj.UserId == userId) {
        return (
          <Card className="mr-4 mb-4 wishlist-card" style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={`http://localhost:5000/${this.props.obj.Images[0]}`}
            />
            <Card.Body>
              <Card.Title className="text-center">
                {this.props.obj.Subtype}
              </Card.Title>
              <Button
                variant="dark"
                onClick={(e) => this.addToCart()}
                className="mb-2"
                block
              >
                <i class="fas fa-shopping-cart mr-2" /> Add to Cart
              </Button>
              <Button
                variant="outline-dark"
                onClick={this.deleteItem}
                className="mb-2"
                block
              >
                <i class="fas fa-trash mr-2" /> Remove from Wishlist
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
    return <div>{this.renderCards()}</div>;
  }
}

export default DisplayWishlist;
