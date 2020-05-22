import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import axios from 'axios';
import Cookies from "universal-cookie";


class userDetails extends Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();
        let user = cookies.get('user');
        let token = cookies.get('token');
        this.state = {
          user: user,
          token: token,
        };
    }

    delete() {
        axios.delete('http://localhost:5000/user/delete/'+this.props.obj._id , 
        {
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }
        })
            .then(console.log('Deleted'))
            .catch(err => console.log(err));
            window.location.href = "/log";
    }


    render() { 
        return ( 
            <tr>
                <td>
                
                <Image  src='https://react.semantic-ui.com/images/avatar/small/matthew.png' avatar/> 
            
                
                <span>{this.props.obj.Username}</span>
                </td>
                <td>
                    {this.props.obj.Type}
                </td>
                <td>

                    <p
                        className="delete"
                        onClick={e =>
                            window.confirm("Are you sure you wish to delete this User?") &&
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
 
export default userDetails;