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
    <section className="!font-black skew-y-6 flex flex-col items-center justify-center gap-7 uppercase blur-[0.5px] w-full h-screen">
      <div className="flex">
        <h1 className="text-8xl scale-y-150 w-full text-[#cbf789]">What do you want to play today?</h1>
      </div>
      <div className="flex text-8xl scale-y-150 border-2 border-[#cbf789] w-full">
        <input
          className="text-center border-2 border-[#cbf789] text-[#cbf789] focus:outline-none focus:ring-0 placeholder-[#cbf789] bg-transparent focus:placeholder-transparent"
          type="text"
          placeholder="Type your sport here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-[#cbf789] text-[#1c1c1c] px-4 py-2 border-none w-full"
          onClick={handleSearch}
        >
          PLAY
        </button>
      </div>
    </section>

  );
};

export default SearchBar;
