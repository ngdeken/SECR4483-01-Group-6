import React from 'react';
import Sidebar from '../../Components/CustomerSidebar';
import '../../../css/StaffHome.css'; // Assuming you have CSS for styling

const HomePage = ({auth, user}) => {


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
