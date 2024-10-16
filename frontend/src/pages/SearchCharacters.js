import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import './SearchCharacters.css'

function SearchCharacter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const responseAPI = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`);
    const apiData = await responseAPI.json();
    // console.log("DATA FROM API:");
    // console.log(apiData)
    // Check the case when the users write an unexpected name
    setSearchResults(apiData.results)
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
        <div className="search-results">
          {/* ADJUST CARD DESIGN */}
          {searchResults.map((character) => (
            <div key={character.id} className="search-result">
              <img src={character.image} alt={character.name} className="search-result-image" />
              <p className="search-result-name">{character.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchCharacter;