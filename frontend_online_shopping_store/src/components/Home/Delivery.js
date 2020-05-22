import React, {Component}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import Table from 'react-bootstrap/Table';

export default class Delivery extends Component {
  render() {
    return (
      <div>
      <NavBar/>
      <div className="main-container">
        <div className="container mt-4 category-container">
          <div className="row ml-3 mr-3">
              <h2>Delivery</h2>
              <p>Our staff at Colombo warehouse work hard to dispatch your goods within 24 hours, but it could take a bit longer during promotions. The delivery dates and charges will depend on your shipping address and order date. We will send you an e-mail and text message when your order dispatch from our warehouse.</p>
              <p>We deliver to all addresses in Sri Lanka. A full postal address is required including postcode. Unfortunately, we cannot deliver to military bases or PO boxes. Any international customer should use there local CSKP website or our global services based in London.</p>
              <p>You could use the cost calculator in checkout form or see below to find more about shipping costs.</p>
          </div>
          <Table striped bordered hover className="mt-5">
            <thead>
              <tr>
                <th>Delivery Method</th>
                <th>Delivery Cost</th>
                <th>Delivery Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Standard - Card payment checkout</td>
                <td>FREE</td>
                <td>3 to 5 working days</td>
              </tr>
              <tr>
                <td>Standard FREE delivery Over Rs. 4500</td>
                <td>FREE</td>
                <td>3 to 5 working days</td>
              </tr>
              <tr>
                <td>Cash on delivery (delivery charges+ COD processing fee)</td>
                <td>FREE</td>
                <td>3 to 5 working days</td>
              </tr>
              <tr>
                <td>Cash on delivery over Rs.4500 (FREE delivery, COD processing fee only)</td>
                <td>FREE</td>
                <td>3 to 5 working days</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      </div>
    )
  }
}
