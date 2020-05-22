import React, { Component } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import TableRow from '../ViewDetails/ManagerDetails';
import { Image, Statistic } from 'semantic-ui-react'

class ViewManager extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            managers : [],
            Female:0,
            Male:0
         };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/storemanager/')
            .then(response => {
                this.setState({ managers: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    countPersons(){
        let male = 0;
        let female = 0;

         this.state.managers.map( object => {
             if(object.Gender ==='Male'){
                 male += 1; 
             }else{
                 female += 1;
             }
        });

       return female
    }

    tabRow(){
        return this.state.managers.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
    }

    render() { 
        return ( 
            <div className="row " >
                <div className="container">
                    <div className="mt-5 ml-5">
               
                        <Statistic.Group>
                    
                                <Statistic color='teal'>
                                <Statistic.Value>
                                    <Image src='https://react.semantic-ui.com/images/avatar/small/matthew.png' inline circular />
                                    {this.state.managers.length}
                                </Statistic.Value>
                                <Statistic.Label>Store Managers</Statistic.Label>
                                </Statistic>

                                <Statistic color='pink'>
                                <Statistic.Value> {this.countPersons()}</Statistic.Value>
                                <Statistic.Label>Female</Statistic.Label>
                                </Statistic>

                                
                                <Statistic color='violet'>
                                <Statistic.Value> { this.state.managers.length - this.countPersons()}</Statistic.Value>
                                <Statistic.Label>Male</Statistic.Label>
                                </Statistic>
                        </Statistic.Group>
                </div>
            </div>
            <div className="container">
                <div  className="col-13 mt-5 ml-5 mr-5" >
               
                    <h5 align="center">Managers List</h5>
                    <MDBTable hover striped responsive>
                    <MDBTableHead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Contact No</th>
                            <th>Address</th>
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
 
export default ViewManager;