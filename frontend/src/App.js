import React, { useState, useEffect } from 'react';
import './App.css';  // Import the external CSS file

const App = () => {
  const [showPagination, setShowPagination] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

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
    if (showPagination) {
      fetchCharacters(page);
    }
  }, [page, showPagination]);

  const handleStart = () => {
    setShowPagination(true);
  };

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
      {!showPagination ? (
        <div className="welcome-container">
          <button onClick={handleStart} className="portal-button">
          Morty, we need to explore the API !
          </button>
        </div>
      ) : (
        <div className='container-page'>
          <h1>Rick and Morty Characters (Page {page})</h1>
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
            <div className="character-grid">
              {characters.map((character) => (
                <div key={character.id} className="character-card">
                  <img src={character.image} alt={character.name} className="character-image" />
                  <h3>{character.name}</h3>
                  <p>Status: {character.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
