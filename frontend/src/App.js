import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/Home';
import AllCharacters from './pages/AllCharacters';
import SearchCharacter from './pages/SearchCharacters';
import FilterCharacter from './pages/FilterCharacters';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/all-characters" element={<AllCharacters />} />
        <Route path="/search-character" element={<SearchCharacter />} />
        <Route path="/filter-character" element={<FilterCharacter />} /> 
      </Routes>
    </Router>
  );
}

export default App;