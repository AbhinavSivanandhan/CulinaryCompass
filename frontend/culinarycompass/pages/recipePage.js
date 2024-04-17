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
            setRecipeName(router.query.recipe);
            getRecipes(router.query.recipe);
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
            {/* <div className="center">
                <h1 className="title">Select a Recipe</h1>
                <div className="imageContainer">
                    {recipes.map((recipe) => (
                        <button key={recipe.id} className="button" onClick={() => handleRecipeClick(recipe)}>
                            {recipe.title}
                        </button>
                    ))}
                </div>
            </div> */}
            {/* Conditionally render the selected recipe details */}
            {(
                <div className="recipe-details">
                    <h2>{"Grilled Boneless Skinless Chicken Thighs"}</h2>
                    
                </div>
            )}


            {selectedRecipe && (
                <div className="recipe-details">
                    <h2>{selectedRecipe.title}</h2>
                    <img src={selectedRecipe.imageUrl} alt={selectedRecipe.title} className="recipe-image" />
                    <h3>Ingredients</h3>
                    <ul className="ingredients-list">
                        {selectedRecipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h3>Preparation Steps</h3>
                    <ol className="steps-list">
                        {selectedRecipe.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
};

export default RecipePage;
