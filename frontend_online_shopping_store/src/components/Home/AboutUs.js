import React, {Component}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import Table from 'react-bootstrap/Table';
import Jumbotron from 'react-bootstrap/Jumbotron';

import about from'./images/about.jpg';

export default class About extends Component {
  render() {
    return (
      <div>
      <NavBar/>
      <div className="main-container">
        <div className="container mt-4 category-container">
          <div className="row mt-5">
          <div className="col-md-6 cus-service">
            <img src={about} class="d-block img-fluid"/>
          </div>
          <div className="col-md-6">
              <h2>Our Brand</h2>
              <hr/>
              <p className="mt-5">Welcome to CSKP! We are an online fast fashion brand that brings you weekly fashion and styles. Our Fashion lines are for the modern day  men, women of all ages who seek on trend, of the moment fashion with a glamorous and unique edge at affordable prices.</p>
              <p className="mt-3">Whether you are looking for the perfect dress, dazzling party wear, smart office wear or casual day fashion, CSKP has everything you need for a complete stylish modern lifestyle.</p>
              <p className="mt-3">All our designs are made to perfection, created from the best fabrics and each piece has an impeccable attention to detail. This is the formula we have been carefully mastered and applied into each product we supply to our customers.</p>
          </div>
          </div>
          <Jumbotron className="mt-5">
            <div className="row mr-4 ml-4">
              <h2>The Concept</h2>
              <p className="mt-5">Our concept is what makes CSKP stand out. We do not plan a mass production of the same style to start each season, which then ends in a sale. Our approach is very different which means our customers only get the best.</p>
              <p className="mt-3">CSKP's talented team and it's proven infrastructure allows us to be dynamic and release new collections on a weekly basis, allowing us to adapt to fashion trends quickly and offer fresh new looks more often. There will always be new lines to find addition to our strong baseline styles, so your wardrobe will never go out of season and you will always be a step ahead with confidence.</p>
              <p className="mt-3">We don't do things because we just have to do them, but we do it the right way! #TheCSKPWay</p>
            </div>
          </Jumbotron>
        </div>
      </div>
      </div>
    )
  }
}
