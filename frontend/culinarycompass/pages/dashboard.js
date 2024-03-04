import { useRouter } from 'next/router';
import React from 'react';
import './dashboard.css'; // Import your CSS file

const Dashboard = () => {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/');
    };

    const handleSearch = () => {
        // Implement search functionality
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="navbar-content">
                    <img src="images/logo.jpeg" alt="Logo" className="logo" />
                </div>
                <div>
                    <button className="nav-button" onClick={handleSearch}>Search for Recipe</button>
                    <button className="nav-button" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            <div className="center">
                <h1 className="title">Welcome to Culinary Compass</h1>
            </div>
        </div>
    );
};

export default Dashboard;
