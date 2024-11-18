import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/search_bar/SearchBar';
import SportsLocations from './components/sportsLocations';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchBar />} />
        <Route path="/sports-locations" element={<SportsLocations />} />
      </Routes>
    </Router>
  );
};

export default App;
