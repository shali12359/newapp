import React, { Component } from "react";
import axios from "axios";
// Import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomeStyle.css";
import Cookies from "universal-cookie";
import NavBar from "./NavBar";
import Card from "react-bootstrap/Card";
import { Comment, Header, Rating, Button as SButton, Label } from "semantic-ui-react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import AddComment from "../AddComment";
import Moment from "react-moment";

export default class Description extends Component {
  constructor(props) {
    const cookies = new Cookies();
    let user = cookies.get("user");
    super(props);

    this.state = {
      // UserID: user.username.toString(),
      user: user,
      DressCode: "",
      DressType: "",
      DressPrice: 0,
      Quantity: 1,
      Discount: 0,
      Image: "",
      Description: "",
      Subtype: "",
      productid: "",
      Quantity: 1,
      Comments: [],
      NewPrice: 0.00,
      updated: true,
    };



    this.clickDecrement = this.clickDecrement.bind(this);
    this.clickIncrement = this.clickIncrement.bind(this);
    this.displayComments = this.displayComments.bind(this);
  }

  componentDidMount() {
    axios
      .get("/product/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          DressCode: response.data.DressCode,
          DressType: response.data.DressType,
          productid: response.data._id,
          Discount: response.data.Discount,
          Quantity: response.data.Quantity,
          DressPrice: response.data.DressPrice,
          Subtype: response.data.Subtype,
          Description: response.data.description,
          Image: response.data.images,
          Quantity: 1,
          NewPrice: response.data.DressPrice * (100 - response.data.Discount) / 100,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("/comment/display")
      .then((response) => {
        this.setState({
          Comments: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  clickDecrement() {
    let quentity = this.state.Quantity;

    if (quentity > 1) {
      quentity = quentity - 1;
    }

    this.setState({ Quantity: quentity });
  }

  clickIncrement() {
    let quentity = this.state.Quantity;

    quentity = quentity + 1;

    this.setState({ Quantity: quentity });
  }

  // getState() {
  //   console.log(this.state);
  // }

  addToCart = async (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    let user = cookies.get("user");

    if (user) {
      const uid = { UserID: this.state.user.userId };
      const obj = {
        UserID: this.state.user.userId,
        DressCode: this.state.DressCode,
        Subtype: this.state.Subtype,
        Description: this.state.Description,
        ProductId: this.state.productid,
        Quantity: this.state.Quantity,
        DressPrice: this.state.NewPrice,
        DressImage: this.state.Image[0],
        Total: this.state.Quantity * this.state.NewPrice,
      };

      const resusertemp = await axios.post(
        "/cart/getCartUser",
        uid
      );
      console.log(resusertemp);
      const cart = resusertemp.data.cart;

      if (resusertemp.data.message === "Cart existing") {
        cart.map((object) => {
          if (object.ProductId === this.state.productid) {
            object.Quantity = object.Quantity + this.state.Quantity;
            object.Total = object.Quantity * this.state.DressPrice;

            this.setState({
              updated: false,
            });

            axios
              .put("/cart/update/" + object._id, object)
              .then((response) => {
                console.log(response);
                window.location.href = "/cartview";
                alert(response.data.message);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      }

      if (this.state.updated == true) {
        const resp = await axios.post("/cart/create", obj);
        window.location.href = "/cartview";
        alert(resp.data.message);
        console.log(resp);
      }
    } else {
      alert("Please Login First..!");
      window.location.href = "/sign-in";
    }
  };

  addToWhishList = (e) => {
    e.preventDefault();

    const cookies = new Cookies();
    let user = cookies.get("user");

    if (user) {
      const obj = {
        Subtype: this.state.Subtype,
        DressPrice: this.state.DressPrice,
        Images: this.state.Image,
        UserId: this.state.user.userId,
        ProductId: this.state.productid,
      };
      console.log(obj);
      axios
        .post("/wishlist/create", obj)
        .then((response) => {
          window.location.href = "/wishlist";
          alert(response.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please Login First..!");
      window.location.href = "/sign-in";
    }
  };

  displayComments() {
    const cookies = new Cookies();
    let user = cookies.get("user");

    const prodId = this.state.productid;

    return this.state.Comments.map(function (object, i) {
      if (object.ProductId == prodId) {
        return (
          <div class="comment">
            <div class="avatar">
              <img src="https://react.semantic-ui.com/images/avatar/small/matthew.png" />
            </div>
            <div class="content">
              <h3 class="author">{object.Username}</h3>
              <div class="metadata">
                <h6>
                  <Moment format="YYYY/MM/DD">{object.date}</Moment>
                </h6>
              </div>
              {(user) ? (user.userId == object.UserId) ?<Button
                variant="dark"
                size="sm"
                onClick={() => {
                      axios
                        .delete(
                          "/comment/delete/" + object._id
                        )
                        .then(console.log("Deleted"))
                        .catch((err) => console.log(err));
                      alert("Comment Deleted..!");
                      window.location.reload();
                }}
                className="float-right ml-3"
              >
                Delete
              </Button> : '' : ''}
              {(user) ? (user.userId == object.UserId) ? <Link to={'/editComment/'+object._id}><Button variant="outline-dark" size="sm" className="float-right">Update</Button></Link> : '' : ''}
              <div class="text">
                <h5>{object.Comment}</h5>
              </div>
            </div>
            <Rating
              icon="star"
              defaultRating={object.Review}
              maxRating={4}
              size="huge"
              disabled
            />
            <hr />
          </div>
        );
      }
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="main-container">
          <div className="container mt-4 category-container">
            <div className="row">
              <div className="col-md-6">
                <Card className="mr-4 product-card" style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={`/${this.state.Image[0]}`}
                  />
                  <Card.Body>
                    <Card.Title className="text-center price">
                      Rs. {this.state.DressPrice}.00
                    </Card.Title>
                    <div className="discount-token">
                      <SButton as='div' labelPosition='right'>
                        <SButton  color='blue'>
                          <i class="fas fa-tag mr-2" />Discount
                        </SButton>
                        <Label as='a' basic color='blue'  pointing='left'>
                          {this.state.Discount} %
                        </Label>
                      </SButton>
                    </div>
                    <hr />
                    <Card.Title className="text-center">
                      New Price: <h2>Rs. {this.state.NewPrice.toFixed(2)}</h2>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-6">
                <h1 className="page-header ml-4 text-center">
                  {this.state.Subtype}
                </h1>
                <ul className="mt-5">
                  <li>
                    <b>Dress Code : </b>
                    {this.state.DressCode}
                  </li>
                  <li>
                    <b>Price : </b>Rs. {this.state.DressPrice}.00
                  </li>
                  <li>
                    <b>Discount : </b> {this.state.Discount} %
                  </li>
                  <li>
                    <b>Type : </b>
                    {this.state.DressType}
                  </li>
                  <li>
                    <b>Subtype : </b>
                    {this.state.Subtype}
                  </li>
                  <li>
                    <b>Description : </b>
                    {this.state.Description}
                  </li>
                </ul>
                <div className="text-center mt-4 mb-4">
                  <label>Select Quentity</label>
                  <br />
                  <Button
                    variant="outline-dark"
                    className="mr-3"
                    onClick={this.clickDecrement}
                  >
                    -
                  </Button>
                  <Button variant="outline-dark" className="mr-3">
                    {this.state.Quantity}
                  </Button>
                  <Button variant="outline-dark" onClick={this.clickIncrement}>
                    +
                  </Button>
                </div>
                <Button
                  variant="dark"
                  onClick={this.addToCart}
                  className="mb-2"
                  block
                >
                  <i class="fas fa-shopping-cart mr-2" /> Add to Cart
                </Button>
                <Button
                  variant="outline-dark"
                  onClick={this.addToWhishList}
                  className="mb-4"
                  block
                >
                  <i class="fas fa-heart mr-2" /> Add to Wishlist
                </Button>
              </div>
            </div>

            <div class="ui comments">
              <h3 className="page-header mt-5">Review & Comments..</h3>
              {this.displayComments()}
              <AddComment productid={this.state.productid} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
