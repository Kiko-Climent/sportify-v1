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
    <section className="!font-black flex flex-col items-center justify-center gap-8 lg:gap-7 uppercase blur-[0.5px] w-full h-screen overflow-hidden">
      <div className="flex skew-y-3">
        <h1 className="leading-9 text-5xl lg:text-8xl scale-y-150 w-full text-highlight text-justify px-1 lg:px-0">What do you want to play today?</h1>
      </div>
      <div className="flex text-2xl lg:text-8xl scale-y-150 border-2 border-highlight w-full skew-y-3 ">
        <input
          className="text-justify lg:text-center border-2 border-highlight text-highlight focus:outline-none focus:ring-0 placeholder-highlight bg-transparent focus:placeholder-transparent"
          type="text"
          placeholder="type your sport here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-highlight text-bg_color px-2 py-2 border-none w-full"
          onClick={handleSearch}
        >
          PLAY
        </button>
      </div>
    </section>

  );
};

export default SearchBar;
