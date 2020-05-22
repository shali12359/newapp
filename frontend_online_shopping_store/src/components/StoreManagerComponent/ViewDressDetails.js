import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import DressDetails from './DressDetails';
import axios from 'axios';
import Cookies from "universal-cookie";

class ViewDressDetails extends Component {

    constructor(props) {
        super(props);
        const cookies = new Cookies();
        let user = cookies.get('user');

        this.state = { 
            user: user,
            products : []
         };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/product/')
            .then(response => {
                this.setState({ products: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabRow(){
        return this.state.products.map(function(object, i){
            
               if(new Cookies().get('user').userId === object.UserId){
                return (<DressDetails obj = { object } key = {i} />)
               }  
        });
    }

    render() {

        return (
            <div className="row" >
            <div className="container">
            <div  className="col-13 mt-5 ml-5 mr-5" >
                <h1 className="mb-5"><center>!!! VIEW PRODUCTS LIST !!!</center></h1>

                <MDBTable striped hover responsive>
                <MDBTableHead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Code</th>
                        <th>Product Category</th>
                        <th>Product Type</th>
                        <th>Product Sub Type</th>
                        <th>Product Description</th>
                        <th>Product Price</th>
                        <th>Product Discount</th>
                        <th > </th>
                        <th > </th>
                    </tr>
                </MDBTableHead>

                <MDBTableBody>
                    { this.tabRow() }
                </MDBTableBody>

                </MDBTable>
            </div>
            </div>
            </div>
        );
    }

}

export default ViewDressDetails;

