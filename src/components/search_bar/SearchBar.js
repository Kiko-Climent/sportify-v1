import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredLocations } from '../../redux/slices/sportsLocationsSlice';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locations = useSelector((state) => state.sportsLocations.locations); // Acceso a todos los datos

  const handleSearch = () => {
    if (!locations || locations.length === 0) {
      alert('Data is still loading. Please wait!');
      return;
    }

    dispatch(setFilteredLocations(searchTerm)); // Filtrar en Redux
    navigate('/sports-locations'); // Redirigir a la página de resultados
  };

  return (
    <section className='flex items-center justify-center'>
      <div></div>
      <div className='pt-48'>
        <input
          type="text"
          placeholder="Search for a sport..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>PLAY</button>
      </div>
    </section>
  );
};

export default SearchBar;
