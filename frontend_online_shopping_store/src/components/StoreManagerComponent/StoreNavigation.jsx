import React, { Component } from 'react';
import './cssstyle.css';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import Cookies from 'universal-cookie';
import axios from "axios";

class StoreNavigation extends Component {

    constructor(props) {
        const cookies = new Cookies();
        let user = cookies.get('user');
            super(props);
            this.onClickSignOut = this.onClickSignOut.bind(this);
           
            this.state = {
                user: user.type,
                
            }
    }

    onClickSignOut(e) {
        e.preventDefault();
        console.log("Signout");
        const cookies = new Cookies();
        const obj = {
            token: cookies.get('token'),
            user: cookies.get('user'),
        };
        axios.post('http://localhost:5000/user/sign-out', obj)
            .then(
                (response) => {
                    const cookies = new Cookies();
                    cookies.remove('token');
                    cookies.remove('user');
                    window.location.href = "/sign-in";

                    //  if( window.location.pathname === 'http://localhost:3000/sign-in'){
                    //      console.log('inside if')
                    //      window.location.href = "/";
                    //  }
                },
                (error) => {
                    cookies.remove('token');
                    cookies.remove('user');
                    window.location.href = "/";
                }
            );
    }
    render() { 
        return (  
           <div>
               <h3 className = "header"> ~~ STORE MANAGER ~~</h3>
               <hr style = {{ color: '#333333', backgroundColor: '#333333', height: 2}}/>

               <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <Nav.Link href="">HOME</Nav.Link>
                    <Nav.Link href="/log">ADD ITEMS</Nav.Link>
                    <Nav.Link href="/log/StoreManager/ViewDressDetails">VIEW ALL</Nav.Link>
                </Nav>
               
                   <Nav>
                    <NavDropdown title={this.state.user} id="collasible-nav-dropdown">
                      
                        <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={this.onClickSignOut}>
                            
                                <div>
                                    
                                        <span>Logout</span>
                                    
                                </div>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            <hr style = {{ color: '#333333', backgroundColor: '#333333', height: 2}}/>
            
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            
            </div>
           </div>      
        );
        
    }
}
 

 export default StoreNavigation
