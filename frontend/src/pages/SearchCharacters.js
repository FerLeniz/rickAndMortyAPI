import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import './SearchCharacters.css';
import { Card } from "../components/Card";
import { Button } from "../components/Button";

function SearchCharacter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setErrorMessage(null);
  };

  const fetchCharacters = async (term, pageNumber) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pageNumber}&name=${term}`
      );
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setSearchResults([]);
        setErrorMessage("No characters found. Please try another name.");
      } else {
        setSearchResults(data.results);
        setTotalResults(data.info.count);
        setTotalPages(data.info.pages);
        setErrorMessage(null);
      }
    } catch (error) {
      console.error("Error fetching characters:", error);
      setErrorMessage("An error occurred while fetching characters.");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPage(1); // Reset to the first page when a new search term is submitted
  };

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetchCharacters(searchTerm, page);
    }
  }, [searchTerm, page]); // Fetch data when searchTerm or page changes

  return (
    <div className="search-container">
      <Navbar />
      <div className="search-bar-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for characters"
            value={searchTerm}
            onChange={handleInputChange}
            className="search-bar-input"
          />
          <button type="submit" className="search-bar-button">
            {isLoading ? "Loading..." : "Search"}
          </button>
        </form>
      </div>
      {searchResults.length > 0 && (
        <>
          <div className="total-and-buttons">
            <Button onClick={handlePrevious} text="Previous page" disabled={page === 1 || isLoading} />
            <p className="text-search">Total: {totalResults}</p>
            <Button onClick={handleNext} text="Next page" disabled={page === totalPages || isLoading} />
          </div>
          <Card characters={searchResults} />
        </>
      )}
      {errorMessage && (
        <div className="error-container">
          <p className="error-message">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default SearchCharacter;