import React from 'react';
import './Navbar.css';

export default class Navbar extends React.Component {
    render() {
        return <div className="navbar">
            <div><a href="/project2/">Home</a></div>
            <div><a href="/project2/commits">Commits</a></div>
            <div><a href="/project2/issues">Issues</a></div>
        </div>
    }
}