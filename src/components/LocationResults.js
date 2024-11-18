import React from 'react';
import { useSelector } from 'react-redux';
import Map from '../components/maps/Map.js';

const LocationResults = () => {
  const filteredLocations = useSelector((state) => state.sportsLocations.filteredLocations);
  const loading = useSelector((state) => state.sportsLocations.loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!filteredLocations || filteredLocations.length === 0) {
    return <div>No locations found</div>; // Manejo cuando no hay datos
  }

  return (
    <div>
      <h1>Sports Locations</h1>
      <ul>
        {filteredLocations.map((location, index) => {
          const fields = location.fields || {};
          const latitude = fields.location?.geoPointValue?.latitude;
          const longitude = fields.location?.geoPointValue?.longitude;

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
              {latitude && longitude && (
                <Map latitude={latitude} longitude={longitude} />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LocationResults;
