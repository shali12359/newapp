import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react'
import axios from 'axios';
import Cookies from "universal-cookie";



class ManagerDetails extends Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();
        let user = cookies.get('user');
        let token = cookies.get('token');
        this.state = {
          user: user,
          token: token,
        };

        this.delete = this.delete.bind(this);
    }

    delete() {
        axios.delete('http://localhost:5000/storemanager/delete/'+this.props.obj._id , {
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }
        })
        .then(console.log('Deleted'))
        .catch(err => console.log(err));
        window.location.href = "/log/Admin/ViewManager";
    }

    render() { 
        return ( 
            <tr>
                <td>
                {(this.props.obj.Gender === 'Female') ? 
                <Image  src='https://react.semantic-ui.com/images/avatar/small/molly.png' avatar/> : 
                <Image  src='https://react.semantic-ui.com/images/avatar/small/matthew.png' avatar/>
                }
                
                <span>{this.props.obj.fname}</span>
                </td>
                <td>
                    {this.props.obj.lname}
                </td>
                <td>
                    {this.props.obj.email}
                </td>
                <td>
                    {this.props.obj.contact}
                </td>
                <td>
                    {this.props.obj.address}
                </td>
                <td>
                    <Link to={"/log/Admin/EditManager/"+this.props.obj._id} className="edit"> <i className="fas fa-user-edit" style={{paddingRight:"10px"}}></i></Link>
                </td>
                <td>

                    <p
                        className="delete"
                        onClick={ () =>
                            window.confirm("Are you sure you wish to delete this Store Manager?") &&
                            this.delete()
                        }
                    >
                        <i className="fas fa-trash" style={{paddingRight:"10px"}}></i>
                    </p>
                </td>
            </tr>
         );
    }
}
 
export default ManagerDetails;