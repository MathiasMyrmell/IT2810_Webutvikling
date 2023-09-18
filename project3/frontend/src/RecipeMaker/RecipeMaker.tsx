import React from 'react';
import './RecipeMaker.css';
import { useState } from "react";
import Button from '@mui/material/Button';
import { useMutation, gql } from '@apollo/client';
import sanitize from '../tools/sanitize';

// GraphQL to add recipes
function getMutation(title: string, directions: String[], ingredients: String[]) {
    return gql`
        mutation {
            createRecipes(input: [{
                    title: "${title}",
                    directions: [${directions.map(s => '"' + s.replaceAll('"', "'") + '"')}],
                    ingredients: [${ingredients.map(s => '"' + s.replaceAll('"', "'") + '"')}]
                }]) {
                    recipes {
                        id
                        title
                        directions
                        ingredients
                    }
                }
            }
        `;
}

function RecipeMaker() {
    const [display, setDisplay] = useState(String);
    const [title, setTitle] = useState(String);
    const [ingredient, setIngredient] = useState(String);
    const [ingredients, setIngredients] = useState(new Array<String>);
    const [description, setDescription] = useState(String);
    const [response, setResponse] = useState(<p className='response'></p>);

    // Help functions
    function capitalizeFirstLetter(string: string) {
        const words = string.split(" ").map(s => s.charAt(0).toUpperCase() + s.slice(1));
        return words.join(" ");
    }

    const addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(capitalizeFirstLetter(sanitize(event.target.value)));
    }

    const addIngredient = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIngredient(sanitize(event.target.value));
    }

    const addIngredientToRecipe = () => {
        const ingredientList = ingredients;
        if (!checkIfIngredientExists(ingredient) && (ingredient != '')) {
            ingredientList.push(ingredient.toLowerCase());
            setIngredients(ingredientList);
        }
        setIngredient("");
        displayIngredients();
    }

    const checkIfIngredientExists = (ingredient: String) => {
        if (ingredients.includes(ingredient)) {
            return true;
        }
        return false;
    }

    const displayIngredients = () => {
        var _html: string = "";
        ingredients.forEach((ingredient) => {
            _html += ingredient + "\n";
        });
        setDisplay(_html);
    }
    const [addRecipes, { data, loading, error }] = useMutation(getMutation(title, description.replaceAll("\n", ",").split(","), ingredients));
    if (error) console.log(error.message);

    const createRecipe = () => {
        if ((title == "") || (ingredients.length == 0) || (description == "")) {
            setResponse(<p className='response'>Add all the necessary information!</p>)
        } else {
            setResponse(<p className='response'>The recipe is added!</p>);
            console.log(addRecipes());
        }
    }

    const addDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(sanitize(event.target.value));
    }

    return (
        <div role="main" className="RecipeMaker">
            <h1>Make Recipes</h1>
            <h2>Title of the recipe:</h2>
            <input data-testid="titleInput" type="text" placeholder="Title" onChange={addTitle} />
            <h2>Add ingredients:</h2>
            <input data-testid="ingredientInput" type="text" placeholder="Ingredient" value={ingredient} onChange={addIngredient} /><br />
            <Button data-testid="addIngredientButton" variant="contained" onClick={addIngredientToRecipe} sx={[
                { backgroundColor: '#FF9900', color: 'black', fontWeight: 'bold', m: '10px 0' },
                { '&:hover': { backgroundColor: '#c66a00', } },]}>Add
            </Button>
            <h3>Added ingredients:</h3>
            <div className='displayIngredients'>
                {display}
            </div>
            <h2>Add directions for the recipe:</h2>
            <textarea aria-label="list of ingredients" name="multiliner" onChange={addDescription}></textarea><br />
            <Button data-testid="addRecipeButton" variant="contained" onClick={createRecipe} sx={[
                { backgroundColor: '#FF9900', color: 'black', fontWeight: 'bold' },
                { '&:hover': { backgroundColor: '#c66a00', } },]}>Upload recipe
            </Button>
            {response}
        </div >
    );
}

export default RecipeMaker;
