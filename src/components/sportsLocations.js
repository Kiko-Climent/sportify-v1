import React from 'react';
import { useSelector } from 'react-redux';

const SportsLocations = () => {
  const filteredLocations = useSelector((state) => state.sportsLocations.filteredLocations); // Datos filtrados
  const loading = useSelector((state) => state.sportsLocations.loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!filteredLocations || filteredLocations.length === 0) {
    return <div>No locations found</div>;
  }

  return (
    <section className='flex justify-center pt-48'>
      <div className='flex'>
        <h1>Sports Locations:</h1>
      </div>
      <div className='flex'>
        <ul>
          {filteredLocations.map((location, index) => {
            const fields = location.fields || {};
            return (
              <li key={index}>
                <h2>{fields.name?.stringValue || 'Name not available'}</h2>
                <p>{fields.address?.stringValue || 'Address not available'}</p>
                <p>{fields.details?.stringValue || 'Details not available'}</p>
                <p>
                  Sports:{' '}
                  {fields.sport?.arrayValue?.values
                    ? fields.sport.arrayValue.values
                        .map((val) => val.stringValue)
                        .join(', ')
                    : 'No sports available'}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default SportsLocations;
