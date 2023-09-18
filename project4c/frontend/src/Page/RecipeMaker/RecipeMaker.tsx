import React from "react";
import "./RecipeMaker.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import sanitize from "../../tools/sanitize";
import {
  InputField,
  CommonButton,
} from "../../Components/MuiElements/muiElements";
import { GET_MUTATION } from "../../Api/queries";
import IngredientCard from "../../Components/IngredientCard/IngredientCard";
import { v4 as uuid } from "uuid";

function RecipeMaker() {
  const [display, setDisplay] = useState(<ul></ul>);
  const [title, setTitle] = useState(String);
  const [ingredient, setIngredient] = useState(String);
  const [ingredients, setIngredients] = useState(new Array<String>());
  const [description, setDescription] = useState(String);
  const [response, setResponse] = useState(<p className="response"></p>);

  // Help functions
  function capitalizeFirstLetter(string: string) {
    const words = string
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1));
    return words.join(" ");
  }

  const addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(capitalizeFirstLetter(sanitize(event.target.value)));
  };

  const addIngredient = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIngredient(sanitize(event.target.value));
  };

  const addIngredientToRecipe = () => {
    const ingredientList = ingredients;
    if (!checkIfIngredientExists(ingredient) && ingredient != "") {
      ingredientList.push(ingredient.toLowerCase());
      setIngredients(ingredientList);
    }
    setIngredient("");
    displayIngredients();
  };

  const checkIfIngredientExists = (ingredient: String) => {
    if (ingredients.includes(ingredient)) {
      return true;
    }
    return false;
  }; 

  const displayIngredients = () => {
    setDisplay(
      <ul>
        {ingredients.map((ingredient) => (
          <IngredientCard
            key={uuid()}
            ingredient={ingredient}
            handleClick={removeIngredient}
          />
        ))}
      </ul>
    );
  };

  const removeIngredient = (ingredient: String) => {
    const ingredientList = ingredients;
    const index = ingredientList.indexOf(ingredient);
    if (index > -1) {
      ingredientList.splice(index, 1);
    }
    setIngredients(ingredientList);
    displayIngredients();
  };

  const [addRecipes, { data, loading, error }] = useMutation(GET_MUTATION, {
    variables: {
      title: title,
      directions: description.replaceAll("\n", ",").split(","),
      ingredients: ingredients,
    },
  });
  if (error) console.log(error.message);

  const createRecipe = () => {
    if (title == "" || ingredients.length == 0 || description == "") {
      setResponse(
        <p className="response">Add all the necessary information!</p>
      );
    } else {
      setResponse(<p className="response">The recipe is added!</p>);
      console.log(addRecipes());
      clearFields();
    }
  };

  const addDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(sanitize(event.target.value));
  };

  const clearFields = () => {
    setTitle("");
    setIngredients([]);
    setDescription("");
    setDisplay(<ul></ul>);
  };

  return (
    <div role="main" className="RecipeMaker">
      <h1>Make Recipes</h1>
      <h2>Title of the recipe:</h2>
      <InputField
        id="titleInput"
        label="Title"
        variant="filled"
        error={title == ""}
        fullWidth
        onChange={addTitle}
        value={title}
      />
      <h2>Add ingredients:</h2>
      <InputField
        id="outlined-search"
        fullWidth
        variant="filled"
        label="Ingredient"
        onChange={addIngredient}
        value={ingredient}
      />
      <br />
      <br />
      <CommonButton
        data-testid="addIngredientButton"
        variant="contained"
        onClick={addIngredientToRecipe}
      >
        Add
      </CommonButton>
      <h3>Ingredients:</h3>
      {display}
      <h2>Add directions for the recipe:</h2>
      <InputField
        id="directions"
        label="Directions"
        variant="filled"
        error={description == ""}
        aria-label="list of ingredients"
        multiline
        inputProps={{ maxLength: 300 }}
        fullWidth
        onChange={addDescription}
        value={description}
      />
      <p id="directionConstraint">Max 300 characters</p>
      <CommonButton
        data-testid="addRecipeButton"
        variant="contained"
        onClick={createRecipe}
      >
        Upload recipe
      </CommonButton>
      {response}
    </div>
  );
}

export default RecipeMaker;
