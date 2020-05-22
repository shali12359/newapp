import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from "universal-cookie";
import { Image } from 'semantic-ui-react';

class CategoryDetails extends Component {
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
        axios.delete('http://localhost:5000/category/delete/'+this.props.obj._id , {
            headers: {
              'Authorization': `Bearer ${this.state.token}`
            }
        })
        .then(console.log('Deleted'))
        .catch(err => console.log(err));
        window.location.href = "/log/Admin/vieCategory";
    }

    render() { 
        return ( 
            <tr>
                <td>
                    <div  className="ui image header">
                        <Image   src={`http://localhost:5000/${this.props.obj.images[0]}`} alt={`productImg-${0}`} /> 
                    </div>
                </td>
                <td>
                    {this.props.obj.CategoryID}
                </td>
                <td>
                    {this.props.obj.CategoryType}
                </td>
                <td>
                    {this.props.obj.SubType}
                </td>
            
                <td>
                    <Link to={"/log/Admin/EditCategory/"+this.props.obj._id} className="edit"><i className="fas fa-edit" style={{paddingRight:"10px"}}></i></Link>
                </td>
                <td>

                    <p
                        className="delete"
                        onClick={e =>
                            window.confirm("Are you sure you wish to delete this Category?") &&
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
 
export default CategoryDetails;

