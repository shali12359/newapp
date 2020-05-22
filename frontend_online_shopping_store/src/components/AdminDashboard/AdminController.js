import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom';

import AddManager from './NavComponenets/CreateStoreManager';
import AddCategory from './NavComponenets/CreateCategory';
import viewManager from './ViewComponent/viewManager';
import viewCategory from './ViewComponent/viewCategory';
import editManager from './EditComponent/editStoreManager';
import editCategory from './EditComponent/editCategory';
import alluser from './AllUsers/allusers';
 
class AdminDashboardController  extends Component {
    render() { 
        return ( 

            <Switch>

                <Route exact path="/log" component={ alluser } />
               
                <Route exact path="/log/Admin/AddManager" component={ AddManager } />
                <Route path="/log/Admin/AddCategory" component={ AddCategory } />

                <Route path="/log/Admin/ViewManager" component={ viewManager } />
                <Route path="/log/Admin/vieCategory" component={ viewCategory } />

                <Route path="/log/Admin/EditManager/:id" component={ editManager } />
                <Route path="/log/Admin/EditCategory/:id" component={ editCategory } />
            </Switch>
         );
    }
}
 
export default AdminDashboardController;