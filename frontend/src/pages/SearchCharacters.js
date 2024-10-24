import React, { useState } from "react";
import Navbar from "../components/Navbar";
import './SearchCharacters.css';
import { Card } from "../components/Card";

function SearchCharacter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0)
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setErrorMessage(null);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const responseAPI = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`);

      if (!responseAPI.ok) {
        throw new Error(`Network response was not ok (status: ${responseAPI.status})`);
      }

      const apiData = await responseAPI.json();

      if (apiData.results.length === 0) {
        setErrorMessage("No characters found for your search term.");
      } else {
        setSearchResults(apiData.results);
        setTotalResults(apiData.info.count)
      }
    } catch (error) {
      console.error("Error fetching characters:", error);
      setErrorMessage("An error occurred while fetching characters. Please try other name");
      setSearchResults([]);
    }
  };

  return (
    <div className="search-container">
      <Navbar />
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
        {searchResults.length > 0 && (
          <>
            <p className="text-search">Characters: {totalResults}</p>
            <Card characters={searchResults} />
          </>
        )}
        {errorMessage && <div className="error-container">
          <p className="error-message">{errorMessage}</p>
        </div>}
      </div>
    </div>
  );
}

export default SearchCharacter;