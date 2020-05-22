import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import NavBar from  './AdminNavBar';
import MainDashboard from './AdminController';
import SideNavBar from  './SideNavBar';
import './style.css';

class AdminDashboardHandler extends Component {
    
    render() { 
        return ( 
            <div>
                
                <NavBar />
                   <div className="row " style={{ marginBottom:"200px"}}>
                        <div className="col-13 ml-5" >
                            
                            <SideNavBar />
                        </div>
                        <div className="col-18 container">
                            <MainDashboard />
                        </div>
                   </div>
                    
                
            </div>
         );
    }
}
 
export default AdminDashboardHandler;