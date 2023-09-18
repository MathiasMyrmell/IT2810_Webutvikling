import React from 'react';
import './Navbar.css';

export default class Navbar extends React.Component {
    render() {
        return <nav className="navbar">
            <div><a href="/project3/">Recipes</a></div>
            <div><a href="/project3/make%20recipe">Make Recipes</a></div>
        </nav>
    }
}