import { useRouter } from 'next/router';
import React from 'react';
import './dashboard.css'; // Import your CSS file

const Dashboard = () => {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/');
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <a href="#" className="nav-link">Search for Recipe</a>
                <button className="nav-link" onClick={handleLogout}>Logout</button>
            </nav>
            <div className="center">
                <h1 className="title">Welcome to Culinary Compass</h1>
            </div>
        </div>
    );
};

export default Dashboard;
