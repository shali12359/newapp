import React, {Component}from 'react';
// Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomeStyle.css';
import { Link } from "react-router-dom";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
             <h4 className="text-center mt-4">Contact Us</h4>
             <ul className="text-center mt-5">
               <li><i className="fa fa-phone"></i> (011) 4 222 333</li>
               <li><i className="fa fa-envelope"></i> cskpfashion@gmail.com</li>
               <li><i className="fa fa-map"></i> 400, main street, Hikkaduwa</li>
             </ul>
            </div>
            <div className="col-md-4 cus-service">
             <h4 className="text-center mt-4">Customer Services</h4>
             <ul className="text-center mt-5">
              <a href="/delivery"><li>Delivery</li></a>
               <a href="/sizeguide"><li>Size Giude</li></a>
               <a href="/about"><li>About us</li></a>
             </ul>
            </div>
            <div className="col-md-4">
              <div className="text-center mt-4">
                <h4 className="text-center mb-5">Follw Us</h4>
                 <a href="https://www.facebook.com/"><i className="fab fa-facebook fa-3x ml-4"></i></a>
                 <a href="https://twitter.com/login"><i className="fab fa-twitter fa-3x ml-4"></i></a>
                 <a href="https://www.instagram.com/?hl=en"><i className="fab fa-instagram fa-3x ml-4"></i></a>
              </div>
            </div>
          </div>
        </div>
       <p className="text-center Copyright">Copyright &copy; 2020 | CSKP Fashion Store (AF | SLIIT)</p>
      </div>
        )
      }
    }
