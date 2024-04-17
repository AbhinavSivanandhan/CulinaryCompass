import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import './recipePage.css';
import { useAuth } from '@/context/Authcontext';

const RecipePage = () => {
    const router = useRouter();
    const [recipeName, setRecipeName] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const { getRecipes, recipes, getUser, user } = useAuth();
    const [showDetails, setShowDetails] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null); // State to store the selected recipe
    const [pageLoaded, setPageLoaded] = useState(false);
    
    useEffect(() => {
        getUser();
        if (router.query.recipename) {
            setRecipeName(router.query.recipename);
            getRecipes(router.query.recipename);
        } else {
            router.push('/404');
        }
    }, [router.query.recipename]);

    useEffect(() => {
        if (recipes && recipeName) {
            setIsLoading(false);
        }
    }, [recipes, recipeName]);

    const handleLogout = () => {
        router.push('/');
    };

    const handleSearch = () => {
        router.push('/');
        // router.push('/dashboard');
    };

    // Function to toggle modal visibility and set selected recipe
    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
        setShowDetails(true);
    };
    // const stepsArray = selectedRecipe.steps ? JSON.parse(selectedRecipe.steps.replace(/'/g, '"')) : [];
                           
    function parseSteps(stepsStr) {
        try {
            // Replace single quotes with double quotes and parse as JSON
            return JSON.parse(stepsStr.replace(/'/g, '"'));
        } catch (e) {
            console.error("Error parsing steps:", e);
            return [];  // Return an empty array in case of error
        }
    }

    const stepsArray = selectedRecipe ? parseSteps(selectedRecipe.steps) : [];
    const ingredientsArray = selectedRecipe ? parseSteps(selectedRecipe.steps) : [];
    return (
        <div className={`dashboard-container ${showDetails ? 'blur-effect' : ''}`}>
            <nav className={`navbar ${showDetails ? 'blur-effect' : ''}`}>
                <div className="navbar-content">
                    <img src="/images/Food_Logo.jpg" alt="Logo" className="logo" />
                    {user ? (
                        <span className="text-lg font-medium text-gray-800">{user.username}</span>
                    ) : (
                        <span className="text-lg font-medium text-gray-800">Loading...</span>
                    )}
                </div>
                <div>
                    <button className="nav-button" onClick={handleSearch}>Dashboard</button>
                    <button className="nav-button" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            <h1 className="title">{recipeName}</h1>
            {!isLoading && recipes && recipes.similar_recipes && recipes.similar_recipes.length > 0 ? (
                <div className="flex flex-wrap m-8">
                    {recipes.similar_recipes.map((recipe, index) => {
                        return (
                            <div className="recipe-details card" key={index} onClick={() => handleRecipeClick(recipe)}>
                                <img src="/images/Food_Logo.jpg" alt="Food Logo" className="card-image" />
                                <h2 className="recipe-title">{recipe.name}</h2>
                                
                                <p>Minutes: {recipe.minutes}</p>
                                <p>Number of Steps: {recipe.n_steps}</p>
                            </div>
                        );
                    })}
                </div>
            ) : isLoading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            ) : (
                <p>No recipe found</p>
            )}
            {showDetails && selectedRecipe && (
                <div className="overlay" onClick={() => setShowDetails(false)}>
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setShowDetails(false)}>&times;</span>
                            <h2 className="recipe-title">{selectedRecipe.name}</h2>
                            <br></br>
                           <h3> <b>Description:</b> {selectedRecipe.description} </h3>
                            <b>Ingredients:</b>
                            <ul className="ingredients-list">
                            {ingredientsArray.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ul>
                            <b>Steps:</b>
                             <ol className="steps-list">
                 {stepsArray.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
            </ol>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipePage;
