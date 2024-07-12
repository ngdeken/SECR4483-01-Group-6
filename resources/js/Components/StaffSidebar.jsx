import React from 'react';
import '../../css/Sidebar.css';
import { Link } from '@inertiajs/react';

const Sidebar = ({auth, user}) => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1>SECR4483-01 Group 6 Project</h1>
                <p>Pizza Ordering System</p>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li><a href={route('staff.index')}>Home</a></li>
                    <li><a href={route('staff.report')}>Manage Order</a></li>
                    <li><a href={route('staff.appliance')}>Manage Menu</a></li>
                    
                </ul>
            </nav>
            <div className="sidebar-footer">
                <Link href={route('logout')} method="post" as="button">Logout</Link>
                <p>Staff</p>
                <p>{user.name}</p>
            </div>
        </div>
    );
};

export default Sidebar;
