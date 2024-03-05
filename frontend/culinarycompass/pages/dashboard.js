import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import './dashboard.css'; // Import your CSS file

const Dashboard = () => {
    const router = useRouter();

    const handleLogout = () => {
        router.push('/');
    };

    const handleSearch = () => {
        // Implement search functionality
    };

    // useEffect(() => {
    //     // check if user is logged in
    //     const loggedIn = localStorage.getItem('access');
    //     if (!loggedIn) {
    //         router.push('/');
    //     }
    //     else{
    //         // Implement fetching user data and logout if unauthorized
    //         try {
    //             // Define the URL of your backend endpoint from env
    //             const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL + '/profile/';
    //             const token = localStorage.getItem('access');
    //             fetch(backendUrl, {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //             })
    //             .then((data) => {
    //                 console.log(data);
    //                 if (!data.ok) {
    //                     throw new Error(`HTTP error! status: ${data.status}`);
    //                 }
    //             });
    //         }
    //         catch (error) {

    //             console.error('Fetching user data error:', error);
                
    //         }
    //     }
    // },[]);

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="navbar-content">
                    <img src="images/Food_Logo.jpg" alt="Logo" className="logo" />
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
