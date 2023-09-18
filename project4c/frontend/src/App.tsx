import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Page/Home/Home";
import RecipeMaker from "./Page/RecipeMaker/RecipeMaker";
import { RecipeData } from "./Page/Home/Home";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

interface dataResult {
  recipes: Array<RecipeData>;
}
const defaultProp: dataResult = {
  recipes: [],
};

function App() {
  return (
    <BrowserRouter basename="/project4c">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/make%20recipe"
          element={
            <>
              <Navbar />
              <RecipeMaker />
            </>
          }
        />
        <Route // if the path is "wrong", redirect to front page
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
