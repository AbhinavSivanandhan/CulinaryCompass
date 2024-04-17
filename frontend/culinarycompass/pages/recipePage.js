import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import './dashboard.css'; // Import your CSS file
import { useAuth } from '@/context/Authcontext'; // Import the useAuth hook


const RecipePage = () => {
    const router = useRouter();
    // State to manage the selected recipe
    // const [setSelectedRecipe] = useState(null);
    // get recipe name from query params
    const [recipeName, setRecipeName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const {getRecipes, recipes} = useAuth();
    useEffect(() => {
        if (router.query.recipename) {
            setRecipeName(router.query.recipename);
            getRecipes(router.query.recipename);
        }
        else{
            router.push('/404');
        }
    }, []);
    useEffect(() => {
        if(recipes !== null && recipes !== undefined && recipeName !== ''){
            setIsLoading(false);
        }
    },[recipes, recipeName]);
    // Handler to simulate recipe selection
    const handleRecipeClick = (recipe) => {
        // setSelectedRecipe(1);
    };
    console.log(recipes)
    console.log("hi")
    console.log(recipes?.similar_recipes[0].ingredients)
    const handleLogout = () => {
        router.push('/');
    };

    const handleSearch = () => {
        // Implement search functionality
    };

    const selectedRecipe =  {
        title: 'Grilled Chicken',
        imageUrl: 'images/Chicken_Manchurian.jpg',
        ingredients: [
          'Chicken breasts',
          'Olive oil',
          'Garlic',
          'Lemon juice',
          'Herbs',
        ],
        steps: [
          'Preheat the grill to medium-high heat.',
          'Mix olive oil, garlic, lemon juice, and herbs in a bowl.',
          'Marinate the chicken in the mixture for at least 30 minutes.',
          'Grill the chicken until it is cooked through, about 6-8 minutes per side.',
        ],
      };

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
            {(
                <div className="recipe-details">
                    <h2>{"Grilled Boneless Skinless Chicken Thighs"}</h2>
                    
                </div>
            )}


{!isLoading && recipes && recipes.similar_recipes && recipes.similar_recipes.length > 0 && (
                <div className="recipe-details">
                    <h2>{recipes.similar_recipes[0].name}</h2>
                    <p>Description: {recipes.similar_recipes[0].description}</p>
                    <p>Minutes: {recipes.similar_recipes[0].minutes}</p>
                    <p>Tags: {recipes.similar_recipes[0].tags}</p>
                    <p>Number of Steps: {recipes.similar_recipes[0].n_steps}</p>
                    <h3>Ingredients:</h3>
                    <ul>
                        {!isLoading&&recipes.similar_recipes[0].ingredients}
                    </ul>
                    {recipes.similar_recipes[0].steps && Array.isArray(recipes.similar_recipes[0].steps) && (
    <div>
        <h3>Steps:</h3>
        <ol>
            {recipes.similar_recipes[0].steps.map((step, index) => (
                <li key={index}>{step}</li>
            ))}
        </ol>
    </div>
)}
                </div>
            )}




            {/* Handle the case where recipe data is still loading or unavailable */}
            {isLoading && <p>Loading...</p>}
            {!isLoading && (!recipes || recipes.similar_recipes.length === 0) && <p>No recipe found</p>}
        </div>
    );
};

export default RecipePage;