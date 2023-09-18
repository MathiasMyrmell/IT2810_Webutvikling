import React from 'react';
import {Link} from 'react-router-dom';
import "./Navbar.css";

export default function Navbar(){
    
        return (
            <nav className="navbar">
                <Link className='link-styles' to="/project4c/">Recipes</Link>
                <Link className='link-styles' to="/make%20recipe">Make Recipes</Link>
            </nav>
        );
    
}