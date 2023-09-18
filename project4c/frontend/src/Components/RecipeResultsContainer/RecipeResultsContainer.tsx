import React from "react";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import BasicPagination from "../../Components/Pagenation/BasicPagination";
import { useQuery } from "@apollo/client";
import { useAppSelector } from "../../Redux/hooks";
import Stack from "@mui/material/Stack";
import { getRecipesQuery, getTitlesQuery } from "../../Api/queries";

// Type RecipeData
export interface RecipeData {
  id: number;
  title: string;
}

interface dataResult {
  recipes: Array<RecipeData>;
}
interface mockProp { 
  mockData?: dataResult;
}

let oldResult: dataResult;
let oldResultCount: number = 1;

export function useTitleCount(where: string, selected: string[]) {
  const { loading, error, data } = useQuery(getTitlesQuery(where, selected));
  return data ? data.recipes.length : 10;
}

function RecipeResultsContainer() {
  const recipesPerPage: number = 10;
  const selected = useAppSelector((state) => state.sort);
  const recipeCount = useTitleCount(
    selected.title,
    selected.selectedIngredients
  );
  const { loading, error, data } = useQuery(
    getRecipesQuery(
      recipesPerPage,
      selected.currentPage,
      selected.sorted,
      selected.title,
      selected.selectedIngredients
    )
  );

  // If we get error
  if (error) return <h1>Error: {error.message}</h1>;

  // Save last fetched data
  if (data) {
    oldResult = data;
    oldResultCount = recipeCount;
  }

  return (
    <div className="recipes">
      <Stack spacing={2}>
        <BasicPagination 
          recipesPerPage={recipesPerPage}
          totalRecipe={loading ? oldResultCount : recipeCount}
        />
        {/* Render list of recipes if fetched, previous results if not. If no previous results are stored return empty element. */}
        {!oldResult && loading ? (
          <></>
        ) : (
          (data ? data : oldResult).recipes.map((d: RecipeData, i: number) => (
            <RecipeCard key={i} {...d} />
          ))
        )}
        <BasicPagination
          recipesPerPage={recipesPerPage}
          totalRecipe={loading ? oldResultCount : recipeCount}
        />
      </Stack>
    </div>
  );
}

export default RecipeResultsContainer;
