import React from 'react';
import './App.css';
import Home from './Components/index';
import Commits from './Components/Commits';
import Issues from './Components/Issues';
import Navbar from './Components/Navbar';

import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";

export default function App() {
  const hasUrl: boolean = localStorage.hasOwnProperty("url");
  const hasToken: boolean = sessionStorage.hasOwnProperty("token");
  const hasTokenAndUrl: boolean = (hasUrl && hasToken) ? true : false;

  return (

    // Everything with the routings to do
    <BrowserRouter basename='/project2'>
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/commits" element={
          (hasTokenAndUrl) ? <><Navbar /><Commits /></> : <Navigate to="/" /> // Redirect if we aren't logged in
        } />
        <Route path="/issues" element={
          (hasTokenAndUrl) ? <><Navbar /><Issues /></> : <Navigate to="/" /> // Redirect if we aren't logged in
        } />
        <Route // if the path is "wrong", redirect to front page
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}