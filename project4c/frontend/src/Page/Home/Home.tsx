import React from "react";
import "./Home.css";
import RecipeResultsContainer from '../../Components/RecipeResultsContainer/RecipeResultsContainer';
import Search from '../../Components/Search/Search'

// Type RecipeData
export interface RecipeData {
  id: number;
  title: string;
}


function Home() {
 
    return (
        <div role="main" className="Home">
            <h1>Recipes</h1>
            <div className='flexMain'>
                <Search />
                <RecipeResultsContainer/>
            </div>
        </div>
    );
}

export default Home;
