import React, { Component } from 'react';
import axios from 'axios';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import TableRow from './UserDetails';
import { Image, Statistic } from 'semantic-ui-react'

class users extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users : [],
         };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/user/')
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    countPersons(){
        let Normaluser = 0;
        let managers = 0;

         this.state.users.map( object => {
             if(object.Type ==='User'){

                Normaluser += 1; 

             }else{

                managers += 1;
             }
        });

       return managers;
    }

    tabRow(){
        return this.state.users.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
    }

    render() { 
        return ( 
            <div className="row">
                <div className="mt-5 mt-5 ml-5">
                    <div className="container ">
                        <Statistic.Group>
                    
                                <Statistic color='teal'>
                                <Statistic.Value>
                                    <Image src='https://react.semantic-ui.com/images/avatar/small/matthew.png' inline circular />
                                    {this.state.users.length}
                                </Statistic.Value>
                                <Statistic.Label>All users</Statistic.Label>
                                </Statistic>

                                <Statistic color='pink'>
                                <Statistic.Value> {this.countPersons() - 1}</Statistic.Value>
                                <Statistic.Label>Managers</Statistic.Label>
                                </Statistic>

                                
                                <Statistic color='violet'>
                                <Statistic.Value> { this.state.users.length - this.countPersons()}</Statistic.Value>
                                <Statistic.Label>Customers</Statistic.Label>
                                </Statistic>
                        </Statistic.Group>
                    </div>
                </div>
                <div className="container">
                    <div  className="col-13 mt-5 ml-5" style={{paddingRight:"100px"}}>
          
                        <h5 align="center">Users List</h5>
                        <MDBTable striped hover  responsive>
                            <MDBTableHead>
                                <tr>
                                    <th>User Emails</th>
                                    <th>User Type</th>
                                    <th colSpan="1">Action</th>
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
 
export default users;