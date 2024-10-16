import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/all-characters">All Characters</Link></li>
                <li><Link to="/search-character">Search characters </Link></li>
                <li><Link to="/filter-character">Filter characters</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;