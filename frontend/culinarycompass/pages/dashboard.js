import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/Authcontext';
import './dashboard.css';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const Dashboard = () => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false); 
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { logout, accessToken, refreshToken, getUser, user, getRecipeList, recipeList, searchRecipe, recipe } = useAuth();

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      router.push('/');
    }
  }, [accessToken, refreshToken, router]);

  useEffect(() => {
    getUser();
    getRecipeList();
    searchRecipe();
  }, []);

  useEffect(() => {
    if (user && recipeList) {
      setIsLoading(false);
    }
  }, [user, recipeList]);

  const handleLogout = () => {
    logout();
  };

  const handleRecipe = (title) => {
    router.push('/recipePage?recipename=' + title);
  };

  const handleSearch = () => {
    setShowSearch(!showSearch); // Toggle search bar visibility
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value); // Update search input state
  };

  const performSearch = () => {
    console.log("Searching for:", searchInput);
    router.push('/recipePage?recipename=' + searchInput);
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
      <div className="flex items-center p-2">
    <img src="/images/Food_Logo.jpg" alt="Logo" className="h-12 mr-4" />
    {user ? <span className="text-lg font-medium text-gray-800">{user.username}</span> : <span className="text-lg font-medium text-gray-800">Loading...</span>}
</div>

        <div>
          <button className="nav-button" onClick={handleSearch}>Search for Recipe</button>
          <button className="nav-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <h1 className="title">Welcome to Culinary Compass</h1>
      <div className="flex flex-wrap m-8">
  {showSearch && (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Type recipe name..."
        value={searchInput}
        onChange={handleSearchInput}
        className="search-input"
      />
      <button onClick={performSearch} className="search-button">Search</button>
    </div>
  )}
</div>
      <div className="flex flex-wrap m-8">
        {isLoading ? (
          <div className="loader-container"><div className="loader"></div></div>
        ) : (
          recipeList.length > 0 ? recipeList.slice(0, 9).map((item, index) => (
            <Card key={item.id} className="mt-6 mb-5 p-8 w-96 flex flex-col items-center " style={{ backgroundColor: '#f5f5f5' }}> 
            <CardHeader color="black" className="w-full">
              <img
                className="card-image w-full"  /* Ensured full width within the header */
                src={item.image}
                alt="card-image"
              />
            </CardHeader>
            <CardBody className="w-full text-center">  
              <Typography style={{ fontWeight: 'bold' }} variant="h5" color="blue" className="mb-2">
                {item.title}
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </CardBody>
            <CardFooter className="card-footer">
    <Button style={{ fontWeight: 'bold' }} onClick={() => handleRecipe(item.title)}>View Recipe</Button>
</CardFooter>

          </Card>
          
          )) : <p>No items to display</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

