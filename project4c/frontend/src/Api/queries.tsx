import { gql, useQuery } from "@apollo/client";

export const GET_RECIPE_INFORMATION = gql`
  query getRecipeInformation($title: String!) {
    recipes(where: { title: $title }) {
      directions
      ingredients
    }
  }
`;

export const GET_MUTATION = gql`
  mutation createRecipe(
    $title: String!
    $directions: [String!]!
    $ingredients: [String!]!
  ) {
    createRecipes(
      input: [
        { title: $title, directions: $directions, ingredients: $ingredients }
      ]
    ) {
      recipes {
        id
        title
        directions
        ingredients
      }
    }
  }
`;

export function getRecipesQuery(
    recipesPerPage: number,
    page: number,
    sort: string,
    where: string,
    selected: string[]
  ) {
    if (sort !== "DESC" && sort !== "ASC") {
      sort = "DESC";
    }
    const offset = (page - 1) * recipesPerPage;
  
    const includedIngredients = selected.length
      ? "AND: [" +
        selected.map((s) => '{ingredients_INCLUDES: "' + s + '"}').join(", ") +
        "]"
      : "";
  
    return gql`
      {
          recipes(options: { offset: ${offset}, limit: ${recipesPerPage}, sort: { title: ${sort} } }, where: {title_CONTAINS: "${where}"${includedIngredients}}) {
              id
              title
            }
      }`;
  }



export function getTitlesQuery(where: string, selected: string[]) {
  // console.log(getRecipeInformation("Zucchini Casserole"));
  const includedIngredients = selected.length
    ? "AND: [" +
      selected.map((s) => '{ingredients_INCLUDES: "' + s + '"}').join(", ") +
      "]"
    : "";

  return gql`
    {
        recipes(where: {title_CONTAINS: "${where}"${includedIngredients}}) {
            title
          }
    }`;
}
