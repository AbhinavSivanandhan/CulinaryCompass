import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import './dashboard.css'; // Make sure your CSS supports a 3x3 grid display

const Dashboard = () => {
    const router = useRouter();
    const [items, setItems] = useState([]);      
    const { logout, accessToken, refreshToken, getUser, user } = useAuth();

    useEffect(() => {
      if (!accessToken && !refreshToken) {
        router.push('/');
      }
    });
    useEffect(() => {
      getUser();
      // Simulating fetching JSON data from an API
      fetch('https://yourapi.com/items')
      .then(response => response.json())
      .then(data => setItems(data.slice(0, 9))) // Taking only the first 9 items
      .catch(error => console.error('Error fetching items:', error));
    }, []);

    const handleLogout = () => {
        logout();
    };

    const handlerecipe = (title) => {
        router.push('/recipePage?recipename='+title);
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                {/* Navbar content */}
            </nav>
            <h1 className="title">Welcome to Culinary Compass</h1>
            <div className="grid-container"> {/* Make sure to define grid-container in your CSS */}
                {items.length > 0 ? items.map((item, index) => (
                    <div key={index} className="grid-item"> {/* grid-item should also be defined in CSS */}
                        {item.image ? <img src={item.image} alt={item.title} /> : null}
                        <p>{item.title}</p>
                        <button onClick={() => handleRecipe(index)}>View Recipe</button>
                    </div>
                )) : <p>No items to display</p>}
            </div>
            <div>
                <button className="nav-button" onClick={() => router.push('/search')}>Search for Recipe</button>
                <button className="nav-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
