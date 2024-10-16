import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleStart = () => {
        navigate('/all-characters');
    }

    return (
        <div className="welcome-container">
            <button onClick={handleStart} className="portal-button">
                Morty, we need to explore the API !
            </button>
        </div>
    );
};

export default Home;