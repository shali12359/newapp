import React, { Component } from 'react';
import {Button, Col, Form} from 'react-bootstrap';
import axios from 'axios';
import {  Message } from 'semantic-ui-react'
class StoreManager extends Component {
    constructor(props) {
        super(props);

        this.onChangeFname = this.onChangeFname.bind(this);
        this.onChangeLname = this.onChangeLname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeComPassword = this.onChangeComPassword.bind(this);
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
            password : '',
            ComPassword : '',
            DOB : '',
            address : '',
            contact : '',
            Gender : '',
            NIC : '',
            message:''

          }
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


    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeComPassword(e) {
        this.setState({
            ComPassword: e.target.value
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
            password : this.state.password,
            ComPassword : this.state.ComPassword,
            DOB : this.state.DOB,
            address : this.state.address,
            contact : this.state.contact,
            Gender : this.state.Gender,
            NIC : this.state.NIC,
        };

        axios.post('http://localhost:5000/storemanager/create', obj)
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
            password : '',
            ComPassword : '',
            DOB : '',
            address : '',
            contact : '',
            Gender : '',
            NIC : ''

        });
        
    }

    render() { 
        return ( 
            <div className="row container" >
                <div  className="col-13 mt-5 ml-5" style={{paddingRight:"100px"}}>
                    <h5>Create Store Manager</h5>

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
                            
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Control 
                                    required
                                    type="password" 
                                    placeholder="Password" 
                                    name="password" 
                                    value={this.state.password}
                                    onChange={this.onChangePassword}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Control 
                                    required
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    name="Cpassword" 
                                    value={this.state.ComPassword}
                                    onChange={this.onChangeComPassword}
                                    />
                            </Form.Group>
                        </Form.Row>

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

                

                    <Button variant="primary" type="submit" >
                        Submit
                    </Button>
                </Form>

                
                {   (this.state.message) ? 

                    (
                        (this.state.message === 'Manager successfully created and send the creditianlas') ? 
                        
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
        </div>
        );
    }
}
 
export default StoreManager;