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
    <section className='flex flex-col items-center justify-center text-highlight h-screen'>
      <div className='uppercase flex text-2xl'>
        <h1 className='text-3xl'>|| locations ||</h1>
      </div>
      <div className='flex text-lg'>
        <ul className='font-semibold'>
          {filteredLocations.map((location, index) => {
            const fields = location.fields || {};
            return (
              <li key={index}>
                <h2>{fields.name?.stringValue || 'Name not available'}</h2>
                <p>{fields.address?.stringValue || 'Address not available'}</p>
                <p>{fields.details?.stringValue || 'Details not available'}</p>
                <h2 className='text-xl'>
                  Sports:{' '}
                  {fields.sport?.arrayValue?.values
                    ? fields.sport.arrayValue.values
                        .map((val) => val.stringValue)
                        .join(', ')
                    : 'No sports available'}
                </h2>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default SportsLocations;
