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
  // const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { logout, accessToken, refreshToken, getUser, user, getRecipeList, recipeList } = useAuth();
  console.log('User:')
  console.log(user);
  useEffect(() => {
    if (!accessToken && !refreshToken) {
      router.push('/');
    }
  });
  useEffect(() => {
    getUser();
    getRecipeList();
    fetch('https://localhost/items')
      .then(response => response.json())
      .then(data => {
        setItems(data.slice(0, 9)); // Taking only the first 9 items
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching items:', error));

  }, []);
  useEffect(() => {
    if (user && recipeList) {
      setIsLoading(false);
    }
  }, [user, recipeList]);
  console.log(user)
  const handleLogout = () => {
    logout();
  };

  const handleRecipe = (title) => {
    router.push('/recipePage?recipename=' + title);
  };
  const handleSearch = () => {

    // Implement search functionality

  };
  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-content">
          <img src="images/Food_Logo.jpg" alt="Logo" className="logo" />
          {user ? <span>{user.username}</span> : <span>Loading...</span>}
        </div>
        <div>
          <button className="nav-button" onClick={handleSearch}>Search for Recipe</button>
          <button className="nav-button" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <h1 className="title">Welcome to Culinary Compass</h1>
      <div className="flex flex-wrap m-8">
        {isLoading ? (
          <div className="loader-container"><div className="loader"></div></div>
        ) : (
          recipeList.length > 0 ? recipeList.map((item, index) => (
            // <div key={index} className=""> 
            //     {item.image ? <img src={item.image} alt={item.title} style={{height: "100%", width: "100%"}}/> : null}
            //     <p>{item.title}</p>
            //     <button onClick={() => handleRecipe(item.title)}>View Recipe</button>
            // </div>
            <Card key={item.id} className="mt-6 w-96 mb-5 inline w-1/3 p-8">
              <CardHeader color="blue" className="relative max-h-sm max-w-sm">
                <img
                  className="rounded h-full w-full object-cover"
                  src={item.image}
                  alt="card-image"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue" className="mb-2">
                  {item.title}
                </Typography>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button onClick={() => handleRecipe(item.title)}>View Recipe</Button>
              </CardFooter>
            </Card>
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
