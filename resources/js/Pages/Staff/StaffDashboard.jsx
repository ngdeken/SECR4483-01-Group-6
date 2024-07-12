import React from 'react';
import Sidebar from '../../Components/StaffSidebar';
import '../../../css/StaffHome.css'; 

const HomePage = ({auth}) => {


    return (
        <div className="app-container">
            <Sidebar user={auth.user}/>
            <div className="content">
                <header className="header">
                    <h1>Welcome back, {auth.user.name}!</h1>
                </header>
            </div>
        </div>
    );
};

export default HomePage;
