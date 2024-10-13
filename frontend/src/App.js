import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [showPagination, setShowPagination] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults,setSearchResults] = useState([]);


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

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);   
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform search, out action to fetch

    console.log('Search term:', searchTerm);
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
          {/* BUTTON */}
          <div className="search-bar-container">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search for a Rick and Morty character"
                value={searchTerm}
                onChange={handleInputChange}
                className="search-bar-input"
              />
              <button type="submit" className="search-bar-button">Search</button>
            </form>
            <div className="search-results">
              {searchResults.map((character) => (
                <div key={character.id} className="search-result">
                  <img src={character.image} alt={character.name} className="search-result-image" />
                  <p className="search-result-name">{character.name}</p>
                </div>
              ))}
            </div>
          </div>
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
                  <h2>{character.name}</h2>
                  <p><strong>Status:</strong> {character.status}</p>
                  <p><strong>Species:</strong> {character.species}</p>
                  <p><strong>Gender:</strong> {character.gender}</p>
                  <p><strong>Origin:</strong> {character.origin.name}</p>
                  <p><strong>Location:</strong> {character.location.name}</p>
                  <p><strong>Appearances:</strong> {character.episode.length}</p>
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
