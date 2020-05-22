import React, { Component } from 'react';
import { Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from "universal-cookie";

class DressDetails extends Component {

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
        axios.delete('http://localhost:5000/product/delete/'+this.props.obj._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err));
        window.location.href = "/log/StoreManager/ViewDressDetails";
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
                        {this.props.obj.DressCode}
                    </td>
                    <td>
                        {this.props.obj.Category}
                    </td>
                    <td>
                        {this.props.obj.DressType}
                    </td>
                    <td>
                        {this.props.obj.Subtype}
                    </td>
                    <td>
                        {this.props.obj.description}
                    </td>
                    <td>
                        {this.props.obj.DressPrice}
                    </td>
                    <td>
                        {this.props.obj.Discount}
                    </td>
                    <td>
                    <Link to={"/log/StoreManager/EditProduct/"+this.props.obj._id} className="edit"> <i className="fas fa-user-edit" style={{paddingRight:"10px"}}></i></Link>
                    </td>
                    <td>
                        
                        <p
                            className="delete"
                            onClick={ () =>
                                window.confirm("Are you sure you wish to delete this product (Dress) ??") &&
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

export default DressDetails;
