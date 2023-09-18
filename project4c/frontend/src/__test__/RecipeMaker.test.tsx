import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import user from "@testing-library/user-event";
import { Provider } from "react-redux";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import store from "../Redux/store";
import RecipeMaker from "../Page/RecipeMaker/RecipeMaker";

const client = new ApolloClient({
  uri: "http://it2810-30.idi.ntnu.no:8080/graphql",
  cache: new InMemoryCache(),
});

const renderRecipeMaker = () => {
  render(
    <ApolloProvider client={client}>
      <React.StrictMode>
        <Provider store={store}>
          <RecipeMaker />
        </Provider>
      </React.StrictMode>
    </ApolloProvider>
  );
};

describe("With React Testing Library", () => {
  it("Render recipe maker page", () => {
    renderRecipeMaker();
    const header = screen.getByText(/Make Recipes/i);
    expect(header).toBeInTheDocument();
    const title = screen.getByText(/Title of the recipe:/i);
    expect(title).toBeInTheDocument();
  });
  it("Fill input", () => {
    renderRecipeMaker();
    user.type(screen.queryByTestId("titleInput")!, "Italian");
    expect(screen.queryByTestId("titleInput")!).toHaveValue("Italian");
  });
  it("Check empty input after adding ingredients", () => {
    renderRecipeMaker();
    user.type(screen.queryByTestId("ingredientInput")!, "chicken");
    expect(screen.queryByTestId("ingredientInput")!).toHaveValue("chicken");
    fireEvent.click(screen.queryByTestId("addIngredientButton")!);
    // After clicking the button, the input field should be empty
    expect(screen.queryByTestId("ingredientInput")!).toHaveValue("");
  });
  it("Error message when trying to make recipe without data", () => {
    renderRecipeMaker();
    fireEvent.click(screen.queryByTestId("addRecipeButton")!);
    const errorMessage = screen.getByText(
      /Add all the necessary information!/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
