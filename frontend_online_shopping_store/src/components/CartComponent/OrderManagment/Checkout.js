import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row } from "react-bootstrap";
import NavBar from "../../Home/NavBar";
import Cookies from "universal-cookie";
import axios from "axios";

export default class Checkout extends Component {
  constructor(props) {
    const cookies = new Cookies();
    let user = cookies.get("user");

    super(props);

    this.state = {
      user: user,
      cart: this.props.location.aboutProps.Cart,
      cartItem: "",
      firstName: "",
      lastName: "",
      address: "",
      paymentType: ""
    };
  }

  async onSubmit() {
    const t = this.state.cart;
    const tempDate = new Date();
    const oid =
      "ORD" + tempDate.valueOf();

    const paymentobj = {
      OrderID: oid,
      UserID: this.state.user.userId,
      Total: this.props.location.aboutProps.Total,
      Address: this.state.address,
      PaymentType: this.state.paymentType,
      Name: this.state.firstName + " " + this.state.lastName,
    };

    await axios
      .post("http://localhost:5000/payment/create", paymentobj)
      .then(console.log("created"))
      .catch((err) => console.log(err));


    await Promise.all(
      t.map(function (object, i) {
        console.log("inside submit map");
        console.log(object);

        const orderobj = {
          OrderId: oid,
          UserID: object.UserID,
          DressCode: object.DressCode,
          Subtype: object.Subtype,
          Description: object.Description,
          ProductId: object.ProductId,
          Quantity: object.Quantity,
          DressPrice: object.DressPrice,
          DressImage: object.DressImage,
          Total: object.Total,
          PlacedDate: tempDate,
        };

        axios
          .post("http://localhost:5000/order/create", orderobj)
          .then(console.log("created"))
          .catch((err) => console.log(err));
      })
    );

    await Promise.all(
      t.map(function (object, i) {
        axios
          .delete("http://localhost:5000/cart/delete/" + object._id)
          .then(console.log("Deleted"))
          .catch((err) => console.log(err));
      })
    );


    alert("Your Order has been Placed sucessfully.!");
    window.location.href = "/log";
  }

  onChangeFirstName = (e) => {
    this.setState({ firstName: e.target.value })
  }
  onChangeLastName = (e) => {
    this.setState({ lastName: e.target.value })
  }
  onChangePaymentType = (e) => {
    this.setState({ paymentType: e.target.value })
  }
  onChangeAddress = (e) => {
    this.setState({ address: e.target.value })
  }


  render() {
    return (
      <div>
        <NavBar />
        <div className="ml-5 mr-5 mt-5 mb-5">
          <h1>Getting Your Order</h1>

          <Form>
            <h3>
              <i class="fa fa-truck" aria-hidden="true"></i> Shipping Information
            </h3>

            <Form.Group as={Col}>
              <Form.Label>First Name</Form.Label>
              <Form.Control required type="text"
                onChange={this.onChangeFirstName} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Last Name</Form.Label>
              <Form.Control required type="text"
                onChange={this.onChangeLastName} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control required type="text"
                onChange={this.onChangeAddress} />
            </Form.Group>

            <h3>
              <i class="fa fa-credit-card-alt" aria-hidden="true"></i> Payment Information
            </h3>

            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Payment Type

                <Col sm={10}>
                  <Form.Check name="groupOptions" type="radio" value="Credit Card" label="Credit Card"
                    onChange={this.onChangePaymentType} />
                  <Form.Check name="groupOptions" type="radio" value="Debit Card" label="Debit Card"
                    onChange={this.onChangePaymentType} />

                  <Form.Group>
                    <Form.Control placeholder="Card PIN" required type="text" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Control placeholder="Card NO" required type="text" />
                  </Form.Group>

                  <Form.Check name="groupOptions" value="Cash on Delivery" type="radio" label="Cash on Delivery"
                    onChange={this.onChangePaymentType} />
                </Col>
              </Form.Label>
            </Form.Group>


            <Form.Group as={Col}>
              <Form.Label>Total Amount</Form.Label>
              <Form.Control
                contentEditable="false"
                type="text"
                value={"LKR   " + this.props.location.aboutProps.Total}
              />
            </Form.Group>

            <Button variant="outline-primary" onClick={(e) => this.onSubmit()}>
              Place Order
            </Button>

          </Form>
        </div>
      </div>
    );
  }
}