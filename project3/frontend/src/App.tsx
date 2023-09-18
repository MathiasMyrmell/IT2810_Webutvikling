import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import RecipeMaker from './RecipeMaker/RecipeMaker';
import { RecipeData } from './Home/Home';
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";

interface dataResult {
  recipes: Array<RecipeData>
}
const defaultProp: dataResult = {
  recipes: [
  ]
}

function App() {
  return (
    <BrowserRouter basename='/project3'>
      <Routes>
        <Route path="/" element={<><Navbar /><Home {...defaultProp} /></>} />
        <Route path="/make%20recipe" element={<><Navbar /><RecipeMaker /></>} />
        <Route // if the path is "wrong", redirect to front page
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
