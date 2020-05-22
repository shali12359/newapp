import React, {Component}from 'react';
// Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './WishlistStyles.css';
import NavBar from '../Home/NavBar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Cookies from "universal-cookie";
import axios from 'axios';

import DisplayWishlist from './DisplayWishlist/DisplayWishlist';

export default class wishlist extends Component {
  constructor(props) {
      const cookies = new Cookies();
      let user = cookies.get('user');

      super(props);
      this.state = {
          user: user,
          Subtype: '',
          Wishlist: []
      }

      // - {this.state.user.userId}
      this.renderCards = this.renderCards.bind(this);

  }

  componentDidMount() {
      axios.get('http://localhost:5000/wishlist/display')
          .then(response => {
              this.setState({ Wishlist: response.data });
          })
          .catch(function (error) {
              console.log(error);
          })
  }


  renderCards() { return this.state.Wishlist.map(function(object, i){
      return <DisplayWishlist obj={object} key={i} />;
  });
}

  getState() {
    console.log(this.state);
  }

  render() {
    return (
      <div>
      <NavBar/>
      <div className="main-container">
        <h1 className="page-header ml-4">My Wishlist </h1>
        <div className="container mt-4 wishlist-container">
          <div className="row">
              {this.renderCards()}
            </div>
        </div>
      </div>
    </div>
    )
  }
}
