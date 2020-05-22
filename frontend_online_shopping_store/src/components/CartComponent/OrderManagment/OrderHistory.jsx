import React, { Component } from "react";
import TableRow from "./Orders";
import axios from "axios";
import NavBar from "../../Home/NavBar";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Cookies from "universal-cookie";

export default class OrderHistory extends Component {
  constructor(props) {
    const cookies = new Cookies();
    let user = cookies.get("user");

    super(props);
    this.state = {
      user: user,
      items: [],
      message: "",
    };
  }

  async componentDidMount() {
    const cookies = new Cookies();
    let user = cookies.get("user");

    const uid = {
      UserID: user.userId,
    };

    const resusertemp = await axios.post(
      "http://localhost:5000/order/getOrderHistory",
      uid
    );

    this.setState({
      items: resusertemp.data.order,
      message: resusertemp.data.message,
    });
  }

  emptOrder() {
    alert("Nothing to show as purchase history..!");
    window.location.href = "/log";
  }

  tabRow() {
    if (this.state.message === "Order not existing") {
      this.emptOrder();
    } else {
      return this.state.items.map(function (object, i) {
        return <TableRow obj={object} key={i} />;
      });
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="main-container">
          <div className="row">
            <div
              className="col-13"
              style={{ paddingLeft: "30px", paddingRight: "100px" }}
            >
              <h1 align="center">Purchase History</h1>
              <MDBTable
                small
                style={{
                  marginTop: "50px",
                  width: "1000px",
                  marginLeft: "250px",
                }}
              >
                <MDBTableHead>
                  <tr>
                    <th>Dress Code</th>
                    <th>Order ID</th>
                    <th>Description</th>
                    <th>Purchased Quantity</th>
                    <th>Dress Price</th>
                    <th>Total Price</th>

                    <th colSpan="1">Comment</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>{this.tabRow()}</MDBTableBody>
              </MDBTable>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
