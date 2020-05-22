import React, { Component } from 'react';
import axios from 'axios';
import TableRow from '../ViewDetails/CategoryDetails';
import { Statistic } from 'semantic-ui-react'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class ViewCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category : []
          }
    }


    componentDidMount(){
        axios.get('http://localhost:5000/category/')
            .then(response => {
                this.setState({ category: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    tabRow(){
        return this.state.category.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
    }

    countCategory(){
        let Cloth = 0;
        let acessary = 0;
        let special = 0;

         this.state.category.map( object => {
             if(object.SubType ==='CLOTHING'){
                Cloth += 1; 
             }else if(object.SubType ==='ACCESSORIES'){
                acessary += 1;
             }else{
                special=+ 1;
             }
        });

        const obj ={Cloth,acessary,special}

        return obj;
    }



    render() { 
        return ( 
            <div className="row">
                 <div className="container">
                    <div className="mt-5 ml-5" > 
                        <Statistic.Group>
                    
                                <Statistic color='teal'>
                                <Statistic.Value>
                                    
                                    {this.state.category.length}
                                </Statistic.Value>
                                <Statistic.Label>Categories</Statistic.Label>
                                </Statistic>

                                <Statistic color='pink'>
                                <Statistic.Value> {this.countCategory().Cloth}</Statistic.Value>
                                <Statistic.Label>CLOTHING</Statistic.Label>
                                </Statistic>

                                
                                <Statistic color='violet'>
                                <Statistic.Value> {this.countCategory().acessary}</Statistic.Value>
                                <Statistic.Label>ACCESSORIES</Statistic.Label>
                                </Statistic>

                                <Statistic color='orange'>
                                <Statistic.Value> {this.countCategory().special}</Statistic.Value>
                                <Statistic.Label>SPECIAL Collection</Statistic.Label>
                                </Statistic>
                                
                            </Statistic.Group>
                    </div>
                </div>
                <div className="container">
                    <div  className="col-13 mt-5 ml-5 mr-5" >
            
                        <h5 align="center">Category List</h5>
                        <MDBTable striped hover responsive>
                        
                            <MDBTableHead>
                            <tr>
                                <th>Category Iamge</th>
                                <th>Category ID</th>
                                <th>Category Type</th>
                                <th>Sub Type</th>
                                <th colSpan="2">Action</th>
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
 
export default ViewCategory;