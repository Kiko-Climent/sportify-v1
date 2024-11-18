import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilteredLocations } from '../../redux/slices/sportsLocationsSlice';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch(setFilteredLocations(searchTerm)); // Enviar el término de búsqueda a Redux
    navigate('/sports-locations'); // Redirigir a la página de resultados
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a sport..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>PLAY</button>
    </div>
  );
};

export default SearchBar;
