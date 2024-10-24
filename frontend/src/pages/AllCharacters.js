import React, { useState, useEffect } from 'react';
import './AllCharacters.css'
import Navbar from '../components/Navbar';
import { Card } from '../components/Card';

const AllCharacters = () => {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Function to fetch characters data from the Rick and Morty API
    const fetchCharacters = async (page) => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
            const data = await response.json();
            setCharacters(data.results);
            setTotalPages(data.info.pages);
        } catch (error) {
            console.error("Error fetching characters:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch characters whenever the page changes
    useEffect(() => {
        fetchCharacters(page);
    }, [page]);

    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    return (
        <div className="app-container">
            <div className='container-page'>
                <Navbar />
                <h1>Rick and Morty Characters (Page {page} of {totalPages})</h1>
                <div className="pagination-controls">
                    <button onClick={handlePrevious} disabled={page === 1} className="pagination-button">
                        Previous page
                    </button>
                    <button onClick={handleNext} disabled={page === totalPages} className="pagination-button">
                        Next page
                    </button>
                </div>
                {isLoading ? (
                    <div className="loading-container">
                        <p className="loading-text">Loading...</p>
                    </div>
                ) : (
                    <Card characters={characters}/>
                )}
            </div>
        </div>
    )
};

export default AllCharacters;