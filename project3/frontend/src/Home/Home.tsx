import React from 'react';
import './Home.css';
import { useEffect, useState } from "react";
import RecipeCard from './RecipeCard';
import { useAppSelector, useAppDispatch } from '../Redux/hooks';
import Search from './Search/Search'
import BasicPagination from './BasicPagination';
import { useQuery, gql } from '@apollo/client';

// Type RecipeData
export interface RecipeData {
    id: number,
    title: string,
    directions: Array<string>,
    ingredients: Array<string>
}

// Query with search, filter and sorting
function getRecipesQuery(recipesPerPage: number, page: number, sort: string, where: string, selected: string[]) {
    if (sort !== "DESC" && sort !== "ASC") { sort = "DESC"; }
    const offset = (page - 1) * recipesPerPage;

    const includedIngredients = selected.length ? "AND: [" + selected.map(s => '{ingredients_INCLUDES: "' + s + '"}').join(", ") + "]" : "";

    return gql`
    {
        recipes(options: { offset: ${offset}, limit: ${recipesPerPage}, sort: { title: ${sort} } }, where: {title_CONTAINS: "${where}"${includedIngredients}}) {
            title
            directions
            ingredients
          }
    }`;
}

// To get number of titles
function getTitlesQuery(where: string, selected: string[]) {
    const includedIngredients = selected.length ? "AND: [" + selected.map(s => '{ingredients_INCLUDES: "' + s + '"}').join(", ") + "]" : "";

    return gql`
    {
        recipes(where: {title_CONTAINS: "${where}"${includedIngredients}}) {
            title
          }
    }`;
}
// Length of all objects for pagination
function useTitleCount(where: string, selected: string[]) {
    const { loading, error, data } = useQuery(getTitlesQuery(where, selected));
    return (data ? data.recipes.length : 10)
}

interface dataResult {
    recipes: Array<RecipeData>
}
interface mockProp {
    mockData?: dataResult;
}

let oldResult: dataResult;
let oldResultCount: number = 1;
function Home(props: dataResult) {

    const recipesPerPage: number = 10;
    const selected = useAppSelector(state => state.sort);
    const { loading, error, data } = useQuery(getRecipesQuery(recipesPerPage, selected.currentPage, selected.sorted, selected.title, selected.selectedIngredients));
    const recipeCount = useTitleCount(selected.title, selected.selectedIngredients);

    // If we get error
    if (error) return <h1>Error: {error.message}</h1>

    // Inserting mock data into oldResult
    if (props.recipes.length) { oldResult = props }

    // Save last fetched data
    if (data) {
        oldResult = data;
        oldResultCount = recipeCount;
    }
    return (
        <div role="main" className="Home">
            <h1>Recipes</h1>
            <div className='flexMain'>
                <Search />
                <div className='recipes'>
                    <BasicPagination recipesPerPage={recipesPerPage} totalRecipe={loading ? oldResultCount : recipeCount} />
                    {/* Render list of recipes if fetched, previous results if not. If no previous results are stored return empty element. */}
                    {(!oldResult && loading) ? <></> : ((data ? data : oldResult).recipes).map((d: RecipeData, i: number) => <RecipeCard key={i} {...d} />)}
                </div>
            </div>
        </div>
    );
}

export default Home;
