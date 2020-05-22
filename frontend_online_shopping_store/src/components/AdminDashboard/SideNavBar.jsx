import React, { Component } from 'react';
import {ListGroup,Card} from 'react-bootstrap'
import './style.css';

class SideNavBar extends Component {
    state = {  }
    render() { 
        return ( 
           
            <div style={{paddingBottom :"30px"}}>
                        <Card style={{ width: '18rem' }}>
                        <Card.Header action href="/Admin"><i className="fas fa-users-cog" style={{paddingRight:"10px"}}></i>Dashboard</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item action href="/log/Admin/AddManager"> <i className="fas fa-user-tie" style={{paddingRight:"10px"}}></i> Add Store Manager</ListGroup.Item>
                            <ListGroup.Item action href="/log/Admin/AddCategory"><i className="fas fa-tshirt" style={{paddingRight:"10px"}}></i>Add category</ListGroup.Item>
                            <ListGroup.Item action href="/log/Admin/ViewManager"> <i className="fas fa-street-view" style={{paddingRight:"10px"}}></i>View Store Manager</ListGroup.Item>
                            <ListGroup.Item action href="/log/Admin/vieCategory"> <i className="fas fa-clipboard-list" style={{paddingRight:"10px"}}></i>View category</ListGroup.Item>
                        </ListGroup>
                        </Card>
            </div>    
         );
    }
}
 
export default SideNavBar;