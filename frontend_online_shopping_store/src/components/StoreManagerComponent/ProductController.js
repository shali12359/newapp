import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';
import ViewDressDetails from './ViewDressDetails';
import UploadProductPage from './AddDressForm'
import editProduct from './editproduct'

class ProductController extends Component {

    render() {
        return (
            <Switch>

                <Route exact path="/log" component={ UploadProductPage } />
                <Route path="/log/StoreManager/ViewDressDetails" component={ ViewDressDetails } />
                <Route path="/log/StoreManager/EditProduct/:id" component={ editProduct } />

            </Switch>
        );
    }

}

export default ProductController;