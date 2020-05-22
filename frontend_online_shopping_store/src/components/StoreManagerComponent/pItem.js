import React, { Component } from 'react';
import {Form} from 'react-bootstrap';

class pItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { nb, task} = this.props;
        return ( 
            <div className="row" >
            <Form.Group controlId="formBasicCheckbox" >
                <Form.Check type="checkbox"  onChange={this.props.onCheckComplete.bind(this, nb)}/>
            </Form.Group>
            <span>{task}</span>
        </div>
        );
    }
}
 
export default pItem;