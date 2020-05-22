import React, { Component } from 'react';
import StoreNavigation from  './StoreNavigation';
import ProductController from './ProductController';

class UploadDressItems extends Component {
    
    render() { 
        return ( 
            <div >
                <div >
                    <StoreNavigation />
                </div>
                <div className="container"> 
                    <ProductController />
                </div>
                
            </div>
         );
    }
}

export default UploadDressItems;

