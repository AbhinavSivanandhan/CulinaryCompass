import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/Authcontext';
import './dashboard.css'; 
const Dashboard = () => {
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);      
    const { logout, accessToken, refreshToken, getUser, user } = useAuth();
    console.log('User:')
    console.log(user);
    useEffect(() => {
      if (!accessToken && !refreshToken) {
        router.push('/');
      }
    });
    useEffect(() => {
      getUser();
      fetch('https://localhost/items')
      .then(response => response.json())
      .then(data => {
        setItems(data.slice(0, 9)); // Taking only the first 9 items
        setIsLoading(false); 
      })      
      .catch(error => console.error('Error fetching items:', error));

    }, []);
    console.log(user)
    const handleLogout = () => {
        logout();
    };

    const handleRecipe = (title) => {
        router.push('/recipePage?recipename='+title);
    };
    const handleSearch = () => {

      // Implement search functionality

    };
    return (
        <div className="dashboard-container">
            <nav className="navbar">
            <div className="navbar-content">
            <img src="images/Food_Logo.jpg" alt="Logo" className="logo" />
            {user && <span>{user.username}</span>}
            </div>
            <div>
            <button className="nav-button" onClick={handleSearch}>Search for Recipe</button>
            <button className="nav-button" onClick={handleLogout}>Logout</button>
            </div>
            </nav>
            <h1 className="title">Welcome to Culinary Compass</h1>
            <div className="grid-container">
              {isLoading ? (
                  <div className="loader-container"><div className="loader"></div></div>
              ) : (
                  items.length > 0 ? items.map((item, index) => (
                      <div key={index} className="grid-item"> 
                          {item.image ? <img src={item.image} alt={item.title} /> : null}
                          <p>{item.title}</p>
                          <button onClick={() => handlerecipe(item.title)}>View Recipe</button>
                      </div>
                  )) : <p>No items to display</p>
              )}
            </div>
            <div>
                <button className="nav-button" onClick={() => router.push('/search')}>Search for Recipe</button>
                <button className="nav-button" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
