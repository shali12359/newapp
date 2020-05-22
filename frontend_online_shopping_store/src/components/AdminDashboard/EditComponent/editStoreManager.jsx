import React, { Component } from 'react';
import {Button, Col, Form} from 'react-bootstrap';
import axios from 'axios';
import {  Message } from 'semantic-ui-react'
import {  Card, Image } from 'semantic-ui-react'

class EditManager extends Component {
    constructor(props) {
        super(props);

        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDOB = this.onChangeDOB.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeContact = this.onChangeContact.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeNIC = this.onChangeNIC.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            managerID : '',
            fname : '',
            lname : '',
            email : '',
            DOB : '',
            address : '',
            contact : '',
            Gender : '',
            NIC : '',
            message:''

          }
    }


    componentDidMount() {
        axios.get('http://localhost:5000/storemanager/'+this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    managerID: response.data.managerID,
                    fname: response.data.fname,
                    lname: response.data.lname,
                    email: response.data.email,
                    DOB: response.data.DOB,
                    address: response.data.address,
                    contact: response.data.contact,
                    Gender: response.data.Gender,
                    NIC: response.data.NIC
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    onChangeFname(e) {
        this.setState({
            fname: e.target.value
        });
    }

    onChangeLname(e) {
        this.setState({
            lname: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }


    onChangeDOB(e) {
        this.setState({
            DOB: e.target.value
        });
    }


    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeContact(e) {
        this.setState({
            contact: e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
            Gender: e.target.value
        });
    }


    onChangeNIC(e) {
        this.setState({
            NIC: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const obj = {
            managerID:this.state.NIC,
            fname : this.state.fname,
            lname : this.state.lname,
            email : this.state.email,
            DOB : this.state.DOB,
            address : this.state.address,
            contact : this.state.contact,
            Gender : this.state.Gender,
            NIC : this.state.NIC,
        };

        axios.put('http://localhost:5000/storemanager/update/'+this.props.match.params.id, obj)
        .then(res => {
                this.setState({
                    message: res.data.message
                });
                console.log(res.data.message);
            }
        );

        this.setState({
            managerID:'',
            fname : '',
            lname : '',
            email : '',
            DOB : '',
            address : '',
            contact : '',
            Gender : '',
            NIC : ''

        });

        window.location.href = "/log/Admin/ViewManager";
        
    }

    render() { 
        return ( 
            <div className="row">
                <div  className="col-13 mt-5 ml-5" style={{ paddingRight:"100px"}}>
                    <div className="container ">
                        {(this.state.Gender === 'Female') ? 
                        <Image  src='https://react.semantic-ui.com/images/avatar/small/molly.png' rounded size='mini' avatar/> : 
                        <Image  src='https://react.semantic-ui.com/images/avatar/small/matthew.png' rounded size='mini' avatar/>
                        }
                        <h5 style={{padding:"1px"}}>Edit Store Manager : {this.state.fname}</h5>

                        <Form onSubmit={this.onSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} >
                                        <Form.Control
                                            required
                                            type="text"
                                            id="fname"
                                            name="firstname"
                                            value={this.state.fname}
                                            onChange={this.onChangeFname}
                                            placeholder="First Name"/>
                                </Form.Group>

                                <Form.Group as={Col} >
                                        <Form.Control
                                            required
                                            type="text"
                                            id="lname"
                                            name="lastname"
                                            value={this.state.lname}
                                            onChange={this.onChangeLname}
                                            placeholder="Last Name"/>
                                </Form.Group>

                                </Form.Row>

                                <Form.Group >
                                        <Form.Control 
                                            required
                                            type="email" 
                                            placeholder="Enter email"
                                            name="email" 
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                        />
                                </Form.Group>
                            

                                <Form.Group>
                                        <Form.Control
                                            required
                                            type="date"
                                            id="dob"
                                            name="dob"
                                            value={this.state.DOB}
                                            onChange={this.onChangeDOB}/>
                                            
                                </Form.Group>

                                <Form.Group controlId="formGridAddress1">
                                <Form.Control
                                            required
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={this.state.address}
                                            onChange={this.onChangeAddress}
                                            placeholder="Address" />
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} >
                                        <Form.Control 
                                            required
                                            type="tel"
                                            id="contact"
                                            name="contact"
                                            value={this.state.contact}
                                            onChange={this.onChangeContact}
                                            placeholder="Contact"/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridGender">
                                        <Form.Control as="select" 
                                        id="type"
                                        name="type"
                                        value={this.state.Gender}
                                        onChange={this.onChangeGender}>
                                        >
                                            <option>Choose</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} >
                                        <Form.Control 
                                            type="text"
                                            id="nic"
                                            name="nic"
                                            value={this.state.NIC}
                                            onChange={this.onChangeNIC}
                                            placeholder="NIC"/>
                                    </Form.Group>
                                </Form.Row>

                        
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                        </Form>
                </div>
        </div>
        <div className="mt-5 ml-5">
            <Card.Group >
            
                <Card >
                {
                    (this.state.Gender === 'Female') ? 
                    <Image  src='https://react.semantic-ui.com/images/avatar/large/molly.png' /> : 
                    <Image  src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                
                }

                <Card.Content>
        
                        <Card.Header>{this.state.fname}</Card.Header>
                        <Card.Meta>{this.state.email}</Card.Meta>
                        <Card.Description>{this.state.address}</Card.Description>
        
                </Card.Content>

                </Card>
            
            </Card.Group>
        </div>

            {   (this.state.message) ? 

                (
                    (this.state.message === 'Manager successfully created') ? 
                    
                    (   
                        <Message color='green'>
                            <center>{this.state.message}</center>
                        </Message>
                    )

                    :

                    (   <Message color='red'>
                            <center>{this.state.message}</center>
                        </Message>
                    )

                )
                :
                null

                }
        </div>
        );
    }
}
 
export default EditManager;