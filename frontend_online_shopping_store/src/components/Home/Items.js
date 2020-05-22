import React, {Component}from 'react';
// Import axios
import axios from 'axios';
// Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomeStyle.css';
import NavBar from './NavBar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Cookies from "universal-cookie";
import { Link } from 'react-router-dom';

import men1 from'./images/men1.jpg';
import men2 from'./images/men2.jpg';
import men3 from'./images/men3.jpg';

export default class Items extends Component {
  constructor(props) {
    const cookies = new Cookies();
    let user = cookies.get('user');
      super(props);
      this.state = {
          user: user,
          category : [],
          product: [],
          CategoryType: ''
        }

        this.displayItems = this.displayItems.bind(this);
  }



  componentDidMount() {
      axios.get('/product/')
        .then(response => {
            this.setState({
              product: response.data
            });
        })
          .catch(function (error) {
            console.log(error);
          })

          axios.get('/category/'+ this.props.match.params.id)
              .then(response => {
                  this.setState({
                      CategoryType: response.data.CategoryType
                  });
              })
              .catch(function (error) {
                  console.log(error);
              })

  }

  getCategory() {
    return  <h1 className="page-header ml-4">{this.state.CategoryType}</h1>
  }

  displayItems() {
    let clickedCategory = this.state.CategoryType;

     return this.state.product.map(function(object, i){
       return  (object.Category == clickedCategory) ? <Card  className="mr-4 mt-3 product-card mb-3" style={{ width: '18rem' }}>
              <Link to={'/description/'+ object._id}><Card.Img variant="top" src={`/${ object.images[0]} `} alt="No Preview"/></Link>
              <Card.Body>
                <Card.Title className="text-center">{ object.Subtype }</Card.Title>
                <Card.Text  className="text-center">Rs. { object.DressPrice }.00</Card.Text>
                <Card.Text  className="text-center"><p><b>Discount:</b> { object.Discount } %</p></Card.Text>
                <Link to={'/description/'+ object._id}><Button variant="dark" className="mb-2" block ><i class="fas fa-shopping-cart mr-2"/> Add to Cart</Button></Link>
                <Link to={'/description/'+ object._id}><Button variant="outline-dark" className="mb-2" block><i class="fas fa-heart mr-2"/> Add to Wishlist</Button></Link>
              </Card.Body>
            </Card> : ''
        ;
  });
}
  render() {
    return (
      <div>
        <NavBar/>
        <div className="main-container">
          { this.getCategory() }
          <div className="container mt-4 category-container">
            <div className="row">
                { this.displayItems() }
              </div>
          </div>
        </div>
      </div>
    )
  }
}
